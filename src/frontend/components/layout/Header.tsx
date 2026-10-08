'use client';

import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';

import { asset } from '@/frontend/lib/asset';
import { cn } from '@/frontend/lib/cn';
import { isNavItemActive, NAV_GROUPS, navGroupOf } from '@/shared/constants/navigation';
import { ROUTES } from '@/shared/constants/routes';

import { SearchIcon } from './SearchIcon';

interface HeaderProps {
  pathname: string;
  menuOpen: boolean;
  onToggleMenu: () => void;
  onOpenSearch: () => void;
}

export function Header({ pathname, menuOpen, onToggleMenu, onOpenSearch }: HeaderProps) {
  const ref = useRef<HTMLElement>(null);
  const [solid, setSolid] = useState(false);
  const [hidden, setHidden] = useState(false);
  const group = navGroupOf(pathname);

  // 상단 어두운 영역(메인 히어로 / 페이지 히어로)을 지나면 밝은 배경, 아래로 스크롤 시 숨김
  useEffect(() => {
    const topBand = document.querySelector<HTMLElement>('.hero, .phero');
    let lastY = scrollY;
    const onScroll = () => {
      const y = scrollY;
      const hdrHeight = ref.current?.offsetHeight ?? 0;
      setSolid(y > (topBand ? topBand.offsetHeight - hdrHeight : 0));
      setHidden(y > lastY && y > innerHeight && !document.body.classList.contains('menu-open'));
      lastY = y;
    };
    addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => removeEventListener('scroll', onScroll);
  }, [pathname]);

  const current = (active: boolean) => (active ? ({ 'aria-current': 'page' } as const) : {});

  return (
    <header ref={ref} className={cn('hdr', solid && 'solid', hidden && !menuOpen && 'hide')}>
      <div className="wrap hdr-in">
        <Link href={ROUTES.home} className="flex shrink-0 items-center gap-3.5" aria-label="미래아이엔텍 홈">
          {/* eslint-disable-next-line @next/next/no-img-element -- 정적 내보내기(이미지 최적화 미사용) */}
          <img className="on-dark h-6 w-auto max-mob:h-5" src={asset('/images/logo-white.png')} alt="MRINT" />
          {/* eslint-disable-next-line @next/next/no-img-element -- 정적 내보내기(이미지 최적화 미사용) */}
          <img className="on-light h-6 w-auto max-mob:h-5" src={asset('/images/logo.png')} alt="" aria-hidden="true" />
          <span className="border-l border-current pl-3.5 text-[13px] leading-none font-semibold tracking-[-.02em] opacity-85 max-mob:hidden">
            미래아이엔텍
          </span>
        </Link>
        <nav className="nav" aria-label="주 메뉴">
          {NAV_GROUPS.map((g) => (
            <div key={g.key} className="nav-item">
              <Link href={g.href} className="nav-top" {...current(group === g.key)}>
                {g.label}
                <i className="caret" />
              </Link>
              <div className="drop">
                {g.items.map((item, i) => (
                  <Link key={item.label} href={item.href} {...current(isNavItemActive(pathname, item.href))}>
                    <em>0{i + 1}</em>
                    <span>
                      <b>{item.label}</b>
                      <i>{item.description}</i>
                    </span>
                  </Link>
                ))}
              </div>
            </div>
          ))}
          <button className="nav-search" type="button" onClick={onOpenSearch}>
            SEARCH <SearchIcon />
          </button>
          <Link href={ROUTES.contact} className="nav-cta" {...current(group === 'contact')}>
            Contact
          </Link>
        </nav>
        <button className="burger" type="button" aria-label="메뉴" onClick={onToggleMenu}>
          <span />
          <span />
        </button>
      </div>
    </header>
  );
}
