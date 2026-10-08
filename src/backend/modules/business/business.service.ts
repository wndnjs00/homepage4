import 'server-only';

import type { BusinessLine } from '@/shared/types/content';

import { findAllBusinessLines, findBusinessLineBySlug } from './business.repository';

export async function listBusinessLines(): Promise<BusinessLine[]> {
  return findAllBusinessLines();
}

export async function getBusinessLine(slug: string): Promise<BusinessLine | null> {
  return findBusinessLineBySlug(slug);
}
