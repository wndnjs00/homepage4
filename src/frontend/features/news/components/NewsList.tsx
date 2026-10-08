import Link from 'next/link';

import { ROUTES } from '@/shared/constants/routes';
import type { News } from '@/shared/types/content';

/** 뉴스·공지 목록 (날짜 / 제목 / 구분 / 화살표) */
export function NewsList({ items }: { items: News[] }) {
  return (
    <div className="plist">
      {items.map((n) => (
        <Link key={n.id} className="prow nrow" href={ROUTES.newsDetail(n.id)}>
          <span className="yr">{n.publishedOn}</span>
          <span className="tt">{n.title}</span>
          <span className="cat" data-c={n.tag}>
            {n.tag}
          </span>
          <span className="go" />
        </Link>
      ))}
    </div>
  );
}
