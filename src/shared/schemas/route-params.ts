import { z } from 'zod';

// 동적 라우트 파라미터 검증 (URL 은 외부 입력)
export const idParamSchema = z.object({
  id: z.coerce.number().int().positive(),
});

export const slugParamSchema = z.object({
  slug: z.string().regex(/^[a-z0-9-]+$/),
});

export const teamProjectParamSchema = z.object({
  slug: z.string().regex(/^[a-z0-9-]+$/),
  index: z.coerce.number().int().nonnegative(),
});
