import type { Project } from '@/shared/types/content';

export type FilterField = 'type' | 'industry' | 'status';
export type FilterSelection = Record<FilterField, string>;

export const ALL = 'ALL';
export const PROJECTS_PER_PAGE = 9;

// 필터 그룹 (고정 목록)
export const PROJECT_FILTERS: { field: FilterField; label: string; options: string[] }[] = [
  { field: 'type', label: 'Type', options: ['SI', 'ITO', 'Solution', '기타', '인프라'] },
  {
    field: 'industry',
    label: 'Industry',
    options: ['공공', '기타', '기타 금융', '미디어/ENT', '보험', '서비스', '은행', '저축은행', '증권'],
  },
  { field: 'status', label: 'Status', options: ['진행중', '완료'] },
];

export const INITIAL_SELECTION: FilterSelection = { type: ALL, industry: ALL, status: ALL };

export function filterProjects(projects: Project[], selection: FilterSelection): Project[] {
  return projects.filter((p) =>
    PROJECT_FILTERS.every(({ field }) => selection[field] === ALL || p[field] === selection[field]),
  );
}

/** 옵션별 개수 (필터 버튼의 위첨자) */
export function countByOption(projects: Project[], field: FilterField, option: string): number {
  return option === ALL ? projects.length : projects.filter((p) => p[field] === option).length;
}

export function pageCount(total: number): number {
  return Math.max(1, Math.ceil(total / PROJECTS_PER_PAGE));
}

export function paginate<T>(items: T[], page: number): T[] {
  return items.slice((page - 1) * PROJECTS_PER_PAGE, page * PROJECTS_PER_PAGE);
}
