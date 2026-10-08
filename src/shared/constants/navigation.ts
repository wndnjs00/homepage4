import { ROUTES } from './routes';

export type NavGroupKey = 'company' | 'business' | 'contact';

export interface NavItem {
  label: string;
  href: string;
  description: string;
}

export interface NavGroup {
  key: Exclude<NavGroupKey, 'contact'>;
  label: string;
  href: string;
  items: NavItem[];
}

// 주 메뉴 (헤더 드롭다운 · 모바일 메뉴 · 푸터 공용)
export const NAV_GROUPS: NavGroup[] = [
  {
    key: 'company',
    label: 'COMPANY',
    href: ROUTES.company,
    items: [
      { label: 'Mirae I&Tec', href: ROUTES.company, description: '기업 소개 · 비전 · 오시는 길' },
      { label: 'Team', href: ROUTES.team, description: '대표이사 및 5개 전문 조직' },
      { label: 'News&Notices', href: ROUTES.news, description: '뉴스 · 공지사항' },
    ],
  },
  {
    key: 'business',
    label: 'BUSINESS',
    href: ROUTES.business,
    items: [
      { label: 'Projects', href: ROUTES.projects, description: '수행 프로젝트 전체 목록' },
      { label: 'Business Line', href: ROUTES.business, description: 'ITO · SI · 인프라 · 솔루션' },
    ],
  },
];

export const COMPANY_INFO = {
  name: '(주)미래아이엔텍',
  address: '서울시 중구 수표로 23, 1001호, 1101호',
  addressEn: '23 Supyo-ro, Jung-gu, Seoul, Republic of Korea',
  tel: '02-557-5267',
  telHref: 'tel:025575267',
  fax: '02-557-5268',
  email: 'mrint01@mrint.co.kr',
  ceo: '김학연',
  mapEmbed: 'https://maps.google.com/maps?q=37.563197,126.990088&z=16&hl=ko&output=embed',
  mapLink: 'https://maps.google.com/maps?ll=37.563197,126.990088&z=16&t=m&hl=ko-KR',
} as const;

/** 현재 경로가 속한 메뉴 그룹 (헤더 활성 표시용) */
export function navGroupOf(pathname: string): NavGroupKey | null {
  if (pathname.startsWith(ROUTES.contact)) return 'contact';
  if (['/company', '/team', '/news'].some((p) => pathname.startsWith(p))) return 'company';
  if (['/projects', '/business'].some((p) => pathname.startsWith(p))) return 'business';
  return null;
}

/** 드롭다운 항목의 활성 여부 */
export function isNavItemActive(pathname: string, href: string): boolean {
  return pathname === href || pathname.startsWith(`${href}/`);
}
