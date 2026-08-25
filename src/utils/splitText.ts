/**
 * Lightweight SplitText-style helpers (no Club GreenSock plugin required).
 * Wrap words/chars so GSAP can stagger reveals.
 */

export function splitWords(text: string): string[] {
  return text.split(/(\s+)/).filter((part) => part.length > 0)
}

export function splitChars(text: string): string[] {
  return Array.from(text)
}
