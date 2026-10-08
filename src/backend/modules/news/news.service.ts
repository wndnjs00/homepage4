import 'server-only';

import type { News } from '@/shared/types/content';

import { findAllNews } from './news.repository';

// 이미지가 없는 게시물에 순서대로 배정하는 기본 이미지
const FALLBACK_IMAGES = [
  '/images/feat-2.jpg',
  '/images/feat-3.jpg',
  '/images/feat-1.jpg',
  '/images/bl-ito.jpg',
  '/images/bl-si.jpg',
  '/images/bl-infra.avif',
];

export interface NewsDetail {
  news: News;
  image: string;
  position: number;
  total: number;
}

export async function listNews(): Promise<News[]> {
  return findAllNews();
}

export async function listLatestNews(limit: number): Promise<News[]> {
  return (await findAllNews()).slice(0, limit);
}

export async function getNewsDetail(id: number): Promise<NewsDetail | null> {
  const all = await findAllNews();
  const index = all.findIndex((n) => n.id === id);
  if (index < 0) return null;
  const news = all[index];
  return {
    news,
    image: news.image ?? FALLBACK_IMAGES[index % FALLBACK_IMAGES.length],
    position: index + 1,
    total: all.length,
  };
}
