'use client';

import { usePathname } from 'next/navigation';
import { useCallback, useEffect, useState } from 'react';

import type { SearchItem } from '@/shared/types/content';

import { Header } from './Header';
import { MobileNav } from './MobileNav';
import { SearchOverlay } from './SearchOverlay';

/** 헤더 · 모바일 메뉴 · 검색 오버레이의 열림 상태를 함께 관리 */
export function SiteChrome({ searchIndex }: { searchIndex: SearchItem[] }) {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  // 페이지 이동 시 모두 닫기 (렌더 중 이전 경로와 비교해 상태 조정)
  const [prevPathname, setPrevPathname] = useState(pathname);
  if (pathname !== prevPathname) {
    setPrevPathname(pathname);
    setMenuOpen(false);
    setSearchOpen(false);
  }

  // 기존 CSS 가 body 클래스(menu-open / search-open)를 기준으로 동작
  useEffect(() => {
    document.body.classList.toggle('menu-open', menuOpen);
    document.body.classList.toggle('search-open', searchOpen);
  }, [menuOpen, searchOpen]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setSearchOpen(false);
        setMenuOpen(false);
      }
    };
    addEventListener('keydown', onKey);
    return () => removeEventListener('keydown', onKey);
  }, []);

  const openSearch = useCallback(() => {
    setMenuOpen(false);
    setSearchOpen(true);
  }, []);

  return (
    <>
      <Header
        pathname={pathname}
        menuOpen={menuOpen}
        onToggleMenu={() => setMenuOpen((v) => !v)}
        onOpenSearch={openSearch}
      />
      <MobileNav pathname={pathname} onNavigate={() => setMenuOpen(false)} onOpenSearch={openSearch} />
      <SearchOverlay items={searchIndex} open={searchOpen} onClose={() => setSearchOpen(false)} />
    </>
  );
}
