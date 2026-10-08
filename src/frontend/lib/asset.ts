import { publicEnv } from './public-env';

/** public/ 정적 파일 경로에 basePath 를 붙인다 (img src 등 next/link 가 아닌 곳에서 사용) */
export function asset(path: string): string {
  if (/^https?:\/\//.test(path)) return path;
  return `${publicEnv.NEXT_PUBLIC_BASE_PATH}${path}`;
}
