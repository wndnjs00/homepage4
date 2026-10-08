import 'server-only';

import { NEWS } from '@/database/data/news';
import { newsSchema } from '@/shared/schemas/content';
import type { News } from '@/shared/types/content';

// 뉴스 데이터 접근. 관리자 기능 도입 시 prisma.news 조회로 교체한다
const ROWS = newsSchema.array().parse(NEWS);

export async function findAllNews(): Promise<News[]> {
  return ROWS;
}
