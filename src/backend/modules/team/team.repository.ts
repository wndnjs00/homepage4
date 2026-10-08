import 'server-only';

import { TEAMS } from '@/database/data/teams';
import { teamSchema } from '@/shared/schemas/content';
import type { Team } from '@/shared/types/content';

// 팀 데이터 접근. 관리자 기능 도입 시 prisma.team 조회로 교체한다
const ROWS = teamSchema.array().parse(TEAMS);

export async function findAllTeams(): Promise<Team[]> {
  return ROWS;
}

export async function findTeamBySlug(slug: string): Promise<Team | null> {
  return ROWS.find((t) => t.slug === slug) ?? null;
}
