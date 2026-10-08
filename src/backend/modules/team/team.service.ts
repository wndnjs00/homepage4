import 'server-only';

import { findProjectIdByTitle } from '@/backend/modules/project/project.service';
import { ROUTES } from '@/shared/constants/routes';
import type { Team, TeamProject, TeamProjectLink } from '@/shared/types/content';

import { findAllTeams, findTeamBySlug } from './team.repository';

export interface TeamDetail {
  team: Team;
  relatedProjects: TeamProjectLink[];
}

export async function listTeams(): Promise<Team[]> {
  return findAllTeams();
}

/** 팀 상세. Related Projects 는 프로젝트 목록에 있으면 그 상세로, 없으면 팀 전용 상세로 연결 */
export async function getTeamDetail(slug: string): Promise<TeamDetail | null> {
  const team = await findTeamBySlug(slug);
  if (!team) return null;
  const relatedProjects = await Promise.all(
    team.relatedProjects.map(async (p, index) => {
      const projectId = await findProjectIdByTitle(p.title);
      const href = projectId ? ROUTES.projectDetail(projectId) : ROUTES.teamProject(team.slug, index);
      return { ...p, href };
    }),
  );
  return { team, relatedProjects };
}

/** 팀 전용 프로젝트 (프로젝트 목록에 없는 항목) */
export async function getTeamProject(
  slug: string,
  index: number,
): Promise<{ team: Team; project: TeamProject } | null> {
  const team = await findTeamBySlug(slug);
  const project = team?.relatedProjects[index];
  if (!team || !project) return null;
  return { team, project };
}

/** 정적 생성 대상: 팀 전용 프로젝트 경로 목록 */
export async function listTeamOnlyProjectParams(): Promise<{ slug: string; index: number }[]> {
  const params: { slug: string; index: number }[] = [];
  for (const team of await findAllTeams()) {
    for (const [index, p] of team.relatedProjects.entries()) {
      if ((await findProjectIdByTitle(p.title)) === null) params.push({ slug: team.slug, index });
    }
  }
  return params;
}
