import 'server-only';

import { z } from 'zod';

// 서버 환경변수 검증. process.env 는 이 파일에서만 읽는다
// DATABASE_URL 은 관리자 기능(DB 조회) 도입 전까지 선택값
const envSchema = z.object({
  NODE_ENV: z.enum(['development', 'test', 'production']).default('development'),
  DATABASE_URL: z.string().url().optional(),
});

export const env = envSchema.parse(process.env);
