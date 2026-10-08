import { z } from 'zod';

// 클라이언트에 노출되는 환경변수 검증 (NEXT_PUBLIC_ 만)
// 서버 전용 환경변수는 backend/config/env.ts 에서 다룬다
const publicEnvSchema = z.object({
  /** GitHub Pages 하위 경로 배포용 (예: /homepage4). 로컬 개발은 빈 값 */
  NEXT_PUBLIC_BASE_PATH: z
    .string()
    .regex(/^(\/[\w-]+)*$/)
    .default(''),
});

// NEXT_PUBLIC_ 값은 빌드 시 문자열로 치환되므로 키를 직접 적어야 한다
export const publicEnv = publicEnvSchema.parse({
  NEXT_PUBLIC_BASE_PATH: process.env.NEXT_PUBLIC_BASE_PATH,
});
