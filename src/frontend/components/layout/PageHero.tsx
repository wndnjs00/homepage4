import Link from 'next/link';
import { Fragment, type ReactNode } from 'react';

import { asset } from '@/frontend/lib/asset';
import { cn } from '@/frontend/lib/cn';
import { ROUTES } from '@/shared/constants/routes';

export interface Crumb {
  label: string;
  href?: string;
}

interface PageHeroProps {
  image: string;
  crumbs: Crumb[];
  title: string;
  /** 긴 제목(뉴스·프로젝트 상세)용 작은 크기 */
  compact?: boolean;
  lead?: string;
  chips?: ReactNode;
}

/** 서브 페이지 상단: 어둡게 깐 배경 사진 + 경로 + 제목 */
export function PageHero({ image, crumbs, title, compact = false, lead, chips }: PageHeroProps) {
  const trail: Crumb[] = [{ label: 'Home', href: ROUTES.home }, ...crumbs];
  return (
    // .phero: 헤더가 스크롤 기준점으로 찾는 클래스
    <section className="phero relative overflow-hidden border-b border-line-d bg-ink pt-[clamp(150px,16vw,240px)] pb-[clamp(56px,7vw,96px)] text-paper">
      <div className="phero-bg">
        {/* eslint-disable-next-line @next/next/no-img-element -- 정적 내보내기(이미지 최적화 미사용) */}
        <img src={asset(image)} alt="" />
      </div>
      <div className="wrap relative">
        <nav className="mb-7 flex flex-wrap items-center gap-2.5 font-mono text-[12px] uppercase tracking-[.06em] text-muted-d before:size-1.5 before:bg-accent before:content-['']">
          {trail.map((c, i) => (
            <Fragment key={`${c.label}-${i}`}>
              {i > 0 && <i className="not-italic opacity-50">/</i>}
              {c.href && i < trail.length - 1 ? (
                <Link href={c.href} className="transition-colors duration-[.25s] hover:text-paper">
                  {c.label}
                </Link>
              ) : (
                <span className={cn(i === trail.length - 1 && 'text-paper')}>{c.label}</span>
              )}
            </Fragment>
          ))}
        </nav>
        <h1
          className={cn(
            'font-bold',
            compact
              ? 'max-w-[30ch] text-[clamp(26px,3.4vw,48px)] leading-[1.3] tracking-[-.035em]'
              : 'max-w-[16ch] text-[clamp(40px,5.6vw,88px)] leading-[1.1] tracking-[-.045em]',
          )}
        >
          {title}
        </h1>
        {lead && (
          <p className="mt-6 max-w-[600px] text-[clamp(16px,1.25vw,19px)] leading-[1.8] text-[rgba(244,244,241,.72)]">{lead}</p>
        )}
        {chips}
      </div>
    </section>
  );
}
