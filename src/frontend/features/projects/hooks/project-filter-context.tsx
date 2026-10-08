'use client';

import { createContext, useContext, useMemo, useState, type ReactNode } from 'react';

import type { Project } from '@/shared/types/content';

import { filterProjects, INITIAL_SELECTION, pageCount, type FilterField, type FilterSelection } from '../lib/project-filter';

interface ProjectFilterState {
  projects: Project[];
  selection: FilterSelection;
  filtered: Project[];
  page: number;
  pages: number;
  select: (field: FilterField, value: string) => void;
  setPage: (page: number) => void;
}

const ProjectFilterContext = createContext<ProjectFilterState | null>(null);

/** 프로젝트 필터 상태 (히어로의 개수 칩과 목록이 함께 사용) */
export function ProjectFilterProvider({ projects, children }: { projects: Project[]; children: ReactNode }) {
  const [selection, setSelection] = useState<FilterSelection>(INITIAL_SELECTION);
  const [page, setPage] = useState(1);
  const filtered = useMemo(() => filterProjects(projects, selection), [projects, selection]);
  const pages = pageCount(filtered.length);

  const value: ProjectFilterState = {
    projects,
    selection,
    filtered,
    page: Math.min(page, pages),
    pages,
    select: (field, v) => {
      setSelection((s) => ({ ...s, [field]: v }));
      setPage(1);
    },
    setPage,
  };
  return <ProjectFilterContext.Provider value={value}>{children}</ProjectFilterContext.Provider>;
}

export function useProjectFilter(): ProjectFilterState {
  const ctx = useContext(ProjectFilterContext);
  if (!ctx) throw new Error('useProjectFilter 는 ProjectFilterProvider 안에서 사용해야 합니다.');
  return ctx;
}
