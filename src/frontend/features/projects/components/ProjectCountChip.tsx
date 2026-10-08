'use client';

import { Chip } from '@/frontend/components/ui/Chips';
import { pad2 } from '@/frontend/lib/cn';

import { useProjectFilter } from '../hooks/project-filter-context';

/** 히어로의 'NN PROJECTS' 칩 (필터 결과 개수) */
export function ProjectCountChip() {
  const { filtered } = useProjectFilter();
  return <Chip accent>{pad2(filtered.length)} PROJECTS</Chip>;
}
