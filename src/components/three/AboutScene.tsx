import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import { Float } from '@react-three/drei'
import { useMousePosition } from '@/hooks/useMousePosition'

/** Lightweight morphing torus for About pin — low poly, soft materials */
export function AboutScene() {
  const mesh = useRef<THREE.Mesh>(null)
  const mouse = useMousePosition(0.05)

  useFrame((_, delta) => {
    if (!mesh.current) return
    const { nx, ny } = mouse.current
    mesh.current.rotation.x = THREE.MathUtils.damp(
      mesh.current.rotation.x,
      0.4 + ny * 0.25,
      3,
      delta,
    )
    mesh.current.rotation.y += delta * 0.35
    mesh.current.rotation.z = THREE.MathUtils.damp(
      mesh.current.rotation.z,
      nx * 0.2,
      3,
      delta,
    )
  })

  return (
    <>
      <ambientLight intensity={0.4} />
      <directionalLight position={[3, 2, 4]} intensity={0.9} color="#fff5e6" />
      <pointLight position={[-2, 1, 2]} intensity={0.4} color="#c9a66b" />
      <Float speed={1.2} floatIntensity={0.4} rotationIntensity={0.15}>
        <mesh ref={mesh} scale={1.15}>
          <torusKnotGeometry args={[0.7, 0.22, 96, 16]} />
          <meshStandardMaterial
            color="#c9a66b"
            metalness={0.65}
            roughness={0.3}
            emissive="#2a2110"
            emissiveIntensity={0.25}
          />
        </mesh>
      </Float>
      <fog attach="fog" args={['#08080a', 3.5, 9]} />
    </>
  )
}
