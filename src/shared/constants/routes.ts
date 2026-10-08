// 사이트 경로. 화면 링크와 서버(검색 색인 등)에서 함께 사용한다
export const ROUTES = {
  home: '/',
  company: '/company',
  team: '/team',
  teamDetail: (slug: string) => `/team/${slug}`,
  teamProject: (slug: string, index: number) => `/team/${slug}/projects/${index}`,
  news: '/news',
  newsDetail: (id: number) => `/news/${id}`,
  projects: '/projects',
  projectDetail: (id: number) => `/projects/${id}`,
  business: '/business',
  businessDetail: (slug: string) => `/business/${slug}`,
  contact: '/contact',
} as const;
