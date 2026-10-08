'use client';

import Link from 'next/link';
import { useRef } from 'react';

import { cn, pad2 } from '@/frontend/lib/cn';
import { ROUTES } from '@/shared/constants/routes';

import { useProjectFilter } from '../hooks/project-filter-context';
import { ALL, countByOption, paginate, PROJECT_FILTERS } from '../lib/project-filter';

/** 프로젝트 목록: Type · Industry · Status 필터 + 카드 그리드 + 페이지 번호 */
export function ProjectExplorer() {
  const { projects, selection, filtered, page, pages, select, setPage } = useProjectFilter();
  const filtersRef = useRef<HTMLDivElement>(null);

  const goTo = (n: number) => {
    setPage(n);
    const top = (filtersRef.current?.getBoundingClientRect().top ?? 0) + scrollY - 120;
    scrollTo({ top, behavior: 'smooth' });
  };

  return (
    <>
      <div ref={filtersRef} className="pfilters">
        {PROJECT_FILTERS.map((g) => (
          <div key={g.field} className="fgrp">
            <em>{g.label}</em>
            <div className="filters">
              {[ALL, ...g.options].map((opt) => (
                <button
                  key={opt}
                  type="button"
                  className={cn(selection[g.field] === opt && 'on')}
                  onClick={() => select(g.field, opt)}
                >
                  {opt === ALL ? '전체' : opt}
                  <sup>{pad2(countByOption(projects, g.field, opt))}</sup>
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="pgrid">
        {paginate(filtered, page).map((p) => (
          <Link key={p.id} className="pcard" href={ROUTES.projectDetail(p.id)}>
            <div className="pcard-meta">
              <span className="cat" data-c={p.type}>
                {p.type}
              </span>
              <span>{p.industry}</span>
              <span>{p.year}</span>
              <span className={cn('st', p.status === '진행중' && 'on')}>{p.status}</span>
            </div>
            <h3>{p.title}</h3>
            <span className="pcard-cl">{p.client}</span>
            <div className="pcard-foot">
              <time>{p.noticeDate}</time>
              <span className="go" />
            </div>
          </Link>
        ))}
      </div>
      {filtered.length === 0 && (
        <p className="border-b border-line py-16 text-center text-muted">해당 조건의 프로젝트가 없습니다.</p>
      )}

      {pages > 1 && (
        <nav className="pnum" aria-label="프로젝트 페이지">
          <button type="button" aria-label="이전 페이지" disabled={page === 1} onClick={() => goTo(page - 1)}>
            &lsaquo;
          </button>
          {Array.from({ length: pages }, (_, i) => i + 1).map((n) => (
            <button
              key={n}
              type="button"
              className={cn(n === page && 'on')}
              aria-current={n === page ? 'page' : undefined}
              onClick={() => goTo(n)}
            >
              {n}
            </button>
          ))}
          <button type="button" aria-label="다음 페이지" disabled={page === pages} onClick={() => goTo(page + 1)}>
            &rsaquo;
          </button>
        </nav>
      )}
    </>
  );
}
