import { describe, expect, it } from 'vitest';

import type { Project } from '@/shared/types/content';

import { ALL, countByOption, filterProjects, INITIAL_SELECTION, pageCount, paginate } from './project-filter';

const make = (id: number, type: string, industry: string, status = '진행중'): Project => ({
  id,
  title: `p${id}`,
  noticeDate: '2025.01.01',
  year: 2025,
  industry,
  type,
  status,
  client: 'c',
});

const projects = [make(1, 'SI', '은행'), make(2, 'ITO', '보험'), make(3, 'SI', '보험', '완료')];

describe('project-filter', () => {
  it('전체 선택이면 모두 반환', () => {
    expect(filterProjects(projects, INITIAL_SELECTION)).toHaveLength(3);
  });

  it('여러 조건을 동시에 적용', () => {
    const result = filterProjects(projects, { type: 'SI', industry: '보험', status: ALL });
    expect(result.map((p) => p.id)).toEqual([3]);
  });

  it('옵션별 개수', () => {
    expect(countByOption(projects, 'type', 'SI')).toBe(2);
    expect(countByOption(projects, 'type', ALL)).toBe(3);
  });

  it('페이지 계산 (9개씩)', () => {
    expect(pageCount(0)).toBe(1);
    expect(pageCount(20)).toBe(3);
    const items = Array.from({ length: 20 }, (_, i) => i);
    expect(paginate(items, 3)).toEqual([18, 19]);
  });
});
