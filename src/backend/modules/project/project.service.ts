import 'server-only';

import type { Project, TeamProject } from '@/shared/types/content';

import { findAllProjects, findProjectById } from './project.repository';

export async function listProjects(): Promise<Project[]> {
  return findAllProjects();
}

export async function getProject(id: number): Promise<Project | null> {
  return findProjectById(id);
}

/** 제목이 같은 프로젝트 id (팀 Related Projects → 프로젝트 상세 연결용) */
export async function findProjectIdByTitle(title: string): Promise<number | null> {
  return (await findAllProjects()).find((p) => p.title === title)?.id ?? null;
}

/** 상세 이미지: 지정 이미지가 없으면 유형별 기본 이미지 */
export function resolveProjectImage(project: Pick<Project | TeamProject, 'image' | 'type'>): string {
  if (project.image) return project.image;
  if (project.type === 'SI') return '/images/feat-3.jpg';
  if (project.type === 'ITO') return '/images/feat-2.jpg';
  return '/images/feat-1.jpg';
}
