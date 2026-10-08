'use client';

import Link from 'next/link';

import { COMPANY_INFO, isNavItemActive, NAV_GROUPS, navGroupOf } from '@/shared/constants/navigation';
import { ROUTES } from '@/shared/constants/routes';

import { SearchIcon } from './SearchIcon';

interface MobileNavProps {
  pathname: string;
  onNavigate: () => void;
  onOpenSearch: () => void;
}

const CONTACT_GROUP = {
  key: 'contact',
  label: 'CONTACT',
  items: [{ label: 'Contact', href: ROUTES.contact, description: '프로젝트 · 협력 문의' }],
};

/** 태블릿 이하 전체 화면 메뉴 (body.menu-open 일 때 표시) */
export function MobileNav({ pathname, onNavigate, onOpenSearch }: MobileNavProps) {
  const isContact = navGroupOf(pathname) === 'contact';
  return (
    <div className="mnav">
      <div className="mnav-groups">
        {[...NAV_GROUPS, CONTACT_GROUP].map((g) => (
          <div key={g.key}>
            <span className="mono text-[11px] text-accent">{g.label}</span>
            <ol>
              {g.items.map((item) => {
                const active = g.key === 'contact' ? isContact : isNavItemActive(pathname, item.href);
                return (
                  <li key={item.label}>
                    <Link href={item.href} onClick={onNavigate} aria-current={active ? 'page' : undefined}>
                      {item.label}
                      <small>{item.description}</small>
                    </Link>
                  </li>
                );
              })}
            </ol>
          </div>
        ))}
      </div>
      <div className="mnav-foot">
        <button className="nav-search" type="button" onClick={onOpenSearch}>
          SEARCH <SearchIcon />
        </button>
        <div>
          {COMPANY_INFO.address}
          <br />
          T. {COMPANY_INFO.tel} · F. {COMPANY_INFO.fax}
          <br />
          <a href={`mailto:${COMPANY_INFO.email}`}>{COMPANY_INFO.email}</a>
        </div>
      </div>
    </div>
  );
}
