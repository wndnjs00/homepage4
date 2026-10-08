import 'server-only';

import { BUSINESS_LINES } from '@/database/data/business-lines';
import { businessLineSchema } from '@/shared/schemas/content';
import type { BusinessLine } from '@/shared/types/content';

// 사업 영역 데이터 접근. 관리자 기능 도입 시 prisma.businessLine 조회로 교체한다
const ROWS = businessLineSchema.array().parse(BUSINESS_LINES);

export async function findAllBusinessLines(): Promise<BusinessLine[]> {
  return ROWS;
}

export async function findBusinessLineBySlug(slug: string): Promise<BusinessLine | null> {
  return ROWS.find((b) => b.slug === slug) ?? null;
}
