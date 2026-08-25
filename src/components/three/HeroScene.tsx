import { useMemo, useRef } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import * as THREE from 'three'
import { useMousePosition } from '@/hooks/useMousePosition'

/**
 * HeroScene — Steven Mengin–inspired atmospheric fluid backdrop.
 * Full-screen shader: soft central light, drifting smoke/fog, black horizon.
 * Pure black void; no stars/comets/meshes.
 *
 * Reveal: opacity ramps 0→1 over ~2.2s (power2.out feel) after mount.
 * Mouse: subtle parallax on light & smoke (heavily damped).
 *
 * Reference feel: https://www.stevenmengin.com/
 */

const vertexShader = /* glsl */ `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`

const fragmentShader = /* glsl */ `
  precision highp float;

  uniform float uTime;
  uniform float uAspect;
  uniform float uReveal;   // 0..1 cinematic fade-in
  uniform vec2  uMouse;    // damped -1..1
  uniform vec2  uRes;

  varying vec2 vUv;

  // --- hash / value noise / fbm (classic fluid-cloud stack) ---
  float hash(vec2 p) {
    return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453123);
  }

  float noise(vec2 p) {
    vec2 i = floor(p);
    vec2 f = fract(p);
    // quintic smooth
    vec2 u = f * f * f * (f * (f * 6.0 - 15.0) + 10.0);
    float a = hash(i);
    float b = hash(i + vec2(1.0, 0.0));
    float c = hash(i + vec2(0.0, 1.0));
    float d = hash(i + vec2(1.0, 1.0));
    return mix(mix(a, b, u.x), mix(c, d, u.x), u.y);
  }

  float fbm(vec2 p) {
    float v = 0.0;
    float a = 0.5;
    mat2 m = mat2(1.6, 1.2, -1.2, 1.6);
    for (int i = 0; i < 6; i++) {
      v += a * noise(p);
      p = m * p;
      a *= 0.5;
    }
    return v;
  }

  // Film grain
  float grain(vec2 uv, float t) {
    return hash(uv * uRes * 0.5 + t) * 2.0 - 1.0;
  }

  void main() {
    vec2 uv = vUv;
    // Centered coords, aspect-correct
    vec2 p = (uv - 0.5) * vec2(uAspect, 1.0);
    p.x += uMouse.x * 0.06;
    p.y += uMouse.y * 0.04;

    float t = uTime * 0.045;

    // Domain-warped smoke — the “liquid vapor” look
    vec2 q = p * 1.35;
    q.y += 0.15;
    float n1 = fbm(q + vec2(t * 0.7, -t * 0.4));
    float n2 = fbm(q * 1.6 + vec2(n1 + t * 0.5, n1 - t * 0.3));
    float smoke = fbm(q + n2 * 1.8);

    // Soft central bloom (white light behind mist)
    vec2 lightPos = vec2(uMouse.x * 0.08, -0.05 + uMouse.y * 0.05);
    float dist = length(p - lightPos);
    float glow = exp(-dist * 2.8) * 1.15;
    glow += exp(-dist * 6.0) * 0.55;
    glow += smoothstep(0.95, 0.0, dist) * 0.25;

    // Horizon silhouette — rolling black hills at bottom
    float horizonY = -0.22
      + sin(uv.x * 3.14159 * 1.2 + t * 0.3) * 0.035
      + sin(uv.x * 6.5 - t * 0.2) * 0.018
      + (smoke - 0.5) * 0.04;
    float ground = smoothstep(horizonY + 0.02, horizonY - 0.08, p.y);

    // Sky mist: brighter near glow, darker at edges
    float mist = smoke * 0.55 + n2 * 0.35;
    mist = smoothstep(0.25, 0.85, mist);

    float luminance = glow * (0.55 + mist * 0.85);
    luminance *= (1.0 - ground);

    // Soft vignette
    float vig = smoothstep(1.35, 0.25, length(p * vec2(0.85, 1.1)));
    luminance *= mix(0.35, 1.0, vig);

    // Top fades darker (like Mengin’s upper smoke)
    luminance *= mix(1.0, 0.45, smoothstep(0.15, 0.85, uv.y));

    // Monochrome — near-white highlight on pure black
    vec3 col = vec3(luminance);
    col += grain(uv, uTime) * 0.035 * uReveal;

    // Cinematic reveal from black
    col *= uReveal;

    gl_FragColor = vec4(col, 1.0);
  }
`

/**
 * Fullscreen triangle with fluid atmosphere shader.
 */
function AtmosphereBackground() {
  const mat = useRef<THREE.ShaderMaterial>(null)
  const { size, viewport } = useThree()
  const mouse = useMousePosition(0.04)
  const reveal = useRef(0)

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uAspect: { value: 1 },
      uReveal: { value: 0 },
      uMouse: { value: new THREE.Vector2(0, 0) },
      uRes: { value: new THREE.Vector2(1, 1) },
    }),
    [],
  )

  useFrame((state, delta) => {
    if (!mat.current) return
    const u = mat.current.uniforms

    u.uTime.value = state.clock.elapsedTime
    u.uAspect.value = size.width / Math.max(size.height, 1)
    u.uRes.value.set(size.width, size.height)

    // Ease reveal 0→1 over ~2.2s (Mengin-like soft wake)
    reveal.current = Math.min(1, reveal.current + delta / 2.2)
    // Smoothstep for premium ease
    const r = reveal.current
    u.uReveal.value = r * r * (3 - 2 * r)

    const { nx, ny } = mouse.current
    u.uMouse.value.x = THREE.MathUtils.damp(u.uMouse.value.x, nx, 2.2, delta)
    u.uMouse.value.y = THREE.MathUtils.damp(u.uMouse.value.y, ny, 2.2, delta)
  })

  // Large plane filling the view
  return (
    <mesh position={[0, 0, 0]} scale={[viewport.width, viewport.height, 1]}>
      <planeGeometry args={[1, 1]} />
      <shaderMaterial
        ref={mat}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={uniforms}
        depthWrite={false}
        depthTest={false}
      />
    </mesh>
  )
}

export function HeroScene() {
  return (
    <>
      <color attach="background" args={['#000000']} />
      <AtmosphereBackground />
    </>
  )
}
