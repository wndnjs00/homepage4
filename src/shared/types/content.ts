import type { z } from 'zod';

import type {
  businessLineSchema,
  clientSchema,
  newsSchema,
  projectSchema,
  teamProjectSchema,
  teamSchema,
} from '@/shared/schemas/content';

// Frontend·Backend 공용 콘텐츠 타입 (DTO). 정의는 shared/schemas/content.ts 의 Zod 스키마
export type News = z.infer<typeof newsSchema>;
export type NewsTag = News['tag'];
export type Project = z.infer<typeof projectSchema>;
export type Client = z.infer<typeof clientSchema>;
export type BusinessLine = z.infer<typeof businessLineSchema>;
export type BusinessFeature = NonNullable<BusinessLine['features']>[number];
export type Team = z.infer<typeof teamSchema>;
export type TeamProject = z.infer<typeof teamProjectSchema>;

/** 팀 Related Projects 를 화면에 표시하기 위한 링크 포함 형태 */
export interface TeamProjectLink extends TeamProject {
  href: string;
}

export interface SearchItem {
  kind: string;
  meta: string;
  title: string;
  href: string;
  /** 검색 대상 문자열 (소문자) */
  keywords: string;
}
