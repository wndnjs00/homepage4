import 'server-only';

import { HOME_CLIENT_ROWS } from '@/database/data/clients';
import { clientRowsSchema } from '@/shared/schemas/content';

// 고객사 데이터 접근. 관리자 기능 도입 시 prisma.client 조회로 교체한다
const ROWS = clientRowsSchema.parse(HOME_CLIENT_ROWS);

export async function findHomeClientRows(): Promise<string[][]> {
  return ROWS;
}
