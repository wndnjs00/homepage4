/** 조건부 className 결합 */
export function cn(...classes: (string | false | null | undefined)[]): string {
  return classes.filter(Boolean).join(' ');
}

/** 숫자를 2자리로 표시 (예: 4 → 04) */
export function pad2(n: number): string {
  return String(n).padStart(2, '0');
}
