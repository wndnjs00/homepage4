import Link from 'next/link';

import { Arrow } from '@/frontend/components/ui/Button';
import { asset } from '@/frontend/lib/asset';
import { ROUTES } from '@/shared/constants/routes';
import type { BusinessLine } from '@/shared/types/content';

/** 사업 영역 카드 2×2 (호버 시 검은 판이 아래에서 차오름) */
export function BusinessLineGrid({ lines }: { lines: BusinessLine[] }) {
  return (
    <div className="bl-grid">
      {lines.map((b, i) => (
        <Link key={b.slug} className={`blc rv d${i % 2}`} href={ROUTES.businessDetail(b.slug)}>
          <div className="blc-img">
            {/* eslint-disable-next-line @next/next/no-img-element -- 정적 내보내기(이미지 최적화 미사용) */}
            <img src={asset(b.image)} alt={`${b.title} 관련 이미지`} />
          </div>
          <div className="blc-in">
            <div className="biz-top">
              <span className="biz-no">{b.no}</span>
              <span className="biz-tag">{b.enTitle.toUpperCase()}</span>
            </div>
            <h3>{b.title}</h3>
            <p>{b.description}</p>
            <ul>
              {b.points.slice(0, 4).map((pt) => (
                <li key={pt}>{pt}</li>
              ))}
            </ul>
            <span className="lnk">
              자세히 보기 <Arrow />
            </span>
          </div>
        </Link>
      ))}
    </div>
  );
}
