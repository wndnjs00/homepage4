import Link from 'next/link';

import { Arrow } from '@/frontend/components/ui/Button';
import { DetailBody } from '@/frontend/components/ui/Detail';
import { Figure } from '@/frontend/components/ui/Figure';
import { ROUTES } from '@/shared/constants/routes';
import type { News } from '@/shared/types/content';

interface NewsDetailViewProps {
  news: News;
  image: string;
  position: number;
  total: number;
}

/** 뉴스 상세: 이미지 + 본문 + 목록으로 */
export function NewsDetailView({ news, image, position, total }: NewsDetailViewProps) {
  return (
    <>
      <DetailBody className="max-w-[920px]">
        <Figure src={image} alt={`${news.title} 관련 이미지`} />
        <h2>게시 내용</h2>
        {news.body.map((p) => (
          <p key={p}>{p}</p>
        ))}
      </DetailBody>
      <div className="mt-14 flex max-w-[920px] items-center justify-between gap-4 border-t border-line pt-6 max-mob:flex-wrap">
        <Link className="lnk mt-0" href={ROUTES.news}>
          <Arrow back />
          목록으로
        </Link>
        <span className="mono text-muted">
          게시물 {position} / {total}
        </span>
      </div>
    </>
  );
}
