import { z } from 'zod';

// 콘텐츠 데이터 스키마. 타입은 shared/types/content.ts 에서 이 스키마로부터 추론한다
// repository 가 데이터(현재 정적 데이터, 이후 DB)를 읽을 때 이 스키마로 검증한다

export const newsSchema = z.object({
  id: z.number().int().positive(),
  publishedOn: z.string(),
  tag: z.enum(['News', 'Business', 'Notice']),
  title: z.string(),
  body: z.array(z.string()),
  image: z.string().optional(),
});

export const projectSchema = z.object({
  id: z.number().int().positive(),
  title: z.string(),
  /** 게시일 (예: 2026.02.11) */
  noticeDate: z.string(),
  year: z.number().int(),
  industry: z.string(),
  type: z.string(),
  status: z.string(),
  client: z.string(),
  period: z.string().optional(),
  overview: z.string().optional(),
  description: z.string().optional(),
  image: z.string().optional(),
});

export const clientSchema = z.object({
  name: z.string(),
  logo: z.string().optional(),
});

const businessBlockSchema = z.object({
  heading: z.string(),
  paragraphs: z.array(z.string()),
  items: z.array(z.string()),
});

export const businessLineSchema = z.object({
  slug: z.string(),
  no: z.string(),
  title: z.string(),
  enTitle: z.string(),
  image: z.string(),
  description: z.string(),
  points: z.array(z.string()),
  summary: z.array(z.string()),
  sections: z.array(businessBlockSchema),
  /** 없으면 섹션 숨김, 빈 배열이면 placeholder 표시 */
  features: z.array(businessBlockSchema.extend({ image: z.string().optional() })).optional(),
  clients: z.array(clientSchema).optional(),
});

/** 팀 Related Projects. title 이 프로젝트 목록과 같으면 해당 프로젝트 상세로 연결된다 */
export const teamProjectSchema = z.object({
  title: z.string(),
  year: z.number().int(),
  type: z.string().optional(),
  status: z.string().optional(),
  client: z.string().optional(),
  period: z.string().optional(),
  overview: z.string().optional(),
  description: z.string().optional(),
  image: z.string().optional(),
});

export const teamSchema = z.object({
  slug: z.string(),
  title: z.string(),
  enTitle: z.string(),
  personName: z.string().optional(),
  image: z.string().optional(),
  /** CEO 전용 약력 */
  bio: z.array(z.object({ heading: z.string(), items: z.array(z.string()) })).optional(),
  intro: z.array(z.string()),
  functions: z.array(z.string()),
  capabilities: z.array(z.string()),
  relatedProjects: z.array(teamProjectSchema),
});

export const clientRowsSchema = z.array(z.array(z.string()));
