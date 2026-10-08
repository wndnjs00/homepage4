'use client';

import Link from 'next/link';
import { useEffect, useMemo, useRef, useState } from 'react';

import { Button } from '@/frontend/components/ui/Button';
import { Eyebrow } from '@/frontend/components/ui/Eyebrow';
import type { SearchItem } from '@/shared/types/content';

const MAX_RESULTS = 12;

interface SearchOverlayProps {
  items: SearchItem[];
  open: boolean;
  onClose: () => void;
}

/** 프로젝트·뉴스·사업분야 통합 검색 (body.search-open 일 때 위에서 내려옴) */
export function SearchOverlay({ items, open, onClose }: SearchOverlayProps) {
  const [query, setQuery] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!open) return;
    const t = setTimeout(() => inputRef.current?.focus(), 50);
    return () => clearTimeout(t);
  }, [open]);

  const q = query.trim().toLowerCase();
  const hits = useMemo(() => (q ? items.filter((it) => it.keywords.includes(q)) : []), [items, q]);

  return (
    <div className="srch" role="dialog" aria-label="검색">
      <div className="wrap">
        <Eyebrow>Search</Eyebrow>
        <h2>무엇을 찾으시나요?</h2>
        <input
          ref={inputRef}
          type="search"
          placeholder="프로젝트, 뉴스, 사업분야 검색"
          autoComplete="off"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <ul>
          {q &&
            (hits.length ? (
              hits.slice(0, MAX_RESULTS).map((h) => (
                <li key={h.href}>
                  <Link href={h.href}>
                    <span className="mono text-[11px] font-normal text-muted-d">{h.kind}</span>
                    <span className="mono text-[11px] font-normal text-muted-d">{h.meta}</span>
                    <span>{h.title}</span>
                  </Link>
                </li>
              ))
            ) : (
              <li className="none">검색 결과가 없습니다.</li>
            ))}
        </ul>
        <Button variant="ghost" onClick={onClose}>
          닫기
        </Button>
      </div>
    </div>
  );
}
