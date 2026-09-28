import type Lenis from "lenis";

let current: Lenis | null = null;

export function setLenis(instance: Lenis | null) {
  current = instance;
}

export function getLenis() {
  return current;
}
