import 'server-only';

import { PROJECTS } from '@/database/data/projects';
import { projectSchema } from '@/shared/schemas/content';
import type { Project } from '@/shared/types/content';

// 프로젝트 데이터 접근. 관리자 기능 도입 시 prisma.project 조회로 교체한다
const ROWS = projectSchema.array().parse(PROJECTS);

export async function findAllProjects(): Promise<Project[]> {
  return ROWS;
}

export async function findProjectById(id: number): Promise<Project | null> {
  return ROWS.find((p) => p.id === id) ?? null;
}
