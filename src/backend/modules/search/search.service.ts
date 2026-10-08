import 'server-only';

import { listBusinessLines } from '@/backend/modules/business/business.service';
import { listNews } from '@/backend/modules/news/news.service';
import { listProjects } from '@/backend/modules/project/project.service';
import { ROUTES } from '@/shared/constants/routes';
import type { SearchItem } from '@/shared/types/content';

// 헤더 검색용 색인 (뉴스 → 프로젝트 → 사업 영역 순)
export async function buildSearchIndex(): Promise<SearchItem[]> {
  const [news, projects, lines] = await Promise.all([listNews(), listProjects(), listBusinessLines()]);
  return [
    ...news.map((n) => ({
      kind: 'NEWS',
      meta: n.publishedOn,
      title: n.title,
      href: ROUTES.newsDetail(n.id),
      keywords: `${n.title} ${n.tag}`.toLowerCase(),
    })),
    ...projects.map((p) => ({
      kind: p.type,
      meta: p.noticeDate,
      title: p.title,
      href: ROUTES.projectDetail(p.id),
      keywords: [p.title, p.client, p.industry, p.type].join(' ').toLowerCase(),
    })),
    ...lines.map((b) => ({
      kind: 'BUSINESS',
      meta: b.slug.toUpperCase(),
      title: `${b.title} — ${b.description}`,
      href: ROUTES.businessDetail(b.slug),
      keywords: [b.title, b.description, ...b.points].join(' ').toLowerCase(),
    })),
  ];
}
