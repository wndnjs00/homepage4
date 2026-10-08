/** 캔버스용 accent 색 (oklch(0.74 0.17 152) 근사값) */
export const ACCENT_RGB = [80, 214, 130] as const;

export function prefersReducedMotion(): boolean {
  return matchMedia('(prefers-reduced-motion: reduce)').matches;
}
