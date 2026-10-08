'use client';

import { useEffect, useState } from 'react';

import { ButtonLink } from '@/frontend/components/ui/Button';
import { Eyebrow } from '@/frontend/components/ui/Eyebrow';
import { SceneCanvas } from '@/frontend/features/canvas/components/SceneCanvas';
import { cn } from '@/frontend/lib/cn';
import { ROUTES } from '@/shared/constants/routes';

import { SeoulClock } from './SeoulClock';

/** 메인 히어로: 격자 캔버스 + 제목 등장 애니메이션 + 하단 상태 바 */
export function HeroSection() {
  const [entered, setEntered] = useState(false);

  useEffect(() => {
    let timer: ReturnType<typeof setTimeout> | undefined;
    const raf = requestAnimationFrame(() => {
      timer = setTimeout(() => setEntered(true), 120);
    });
    return () => {
      cancelAnimationFrame(raf);
      clearTimeout(timer);
    };
  }, []);

  return (
    <section className={cn('hero', entered && 'in')}>
      <SceneCanvas scene="hero" />
      <div className="hero-veil" />
      <div className="wrap hero-body">
        <Eyebrow tone="dark" className="mb-10">
          Mirae I&amp;N Tech — Financial IT Partner since 2003
        </Eyebrow>
        <h1>
          <span className="ln">
            <span>금융의 미래를</span>
          </span>
          <span className="ln">
            <span>
              <em>연결</em>하는 기술
            </span>
          </span>
        </h1>
        <p className="hero-sub">
          금융 IT의 깊이 있는 경험과 기술력을 바탕으로 시스템 구축부터 운영까지, 기업의 디지털 혁신을 함께합니다.
        </p>
        <div className="hero-actions">
          <ButtonLink href={ROUTES.business} variant="accent">
            사업영역 보기
          </ButtonLink>
          <ButtonLink href={ROUTES.projects} variant="ghost">
            사업실적
          </ButtonLink>
        </div>
      </div>
      <div className="hero-foot">
        <div className="wrap grid grid-cols-4 max-mob:grid-cols-2">
          <div className="cell">
            <span className="live" />
            <b>System Status</b>&nbsp;Operational
          </div>
          <div className="cell">
            Est.&nbsp;<b>2003</b>
          </div>
          <div className="cell">SI · ITO · Infra · Solution</div>
          <div className="cell">
            Seoul, KR&nbsp;
            <SeoulClock />
          </div>
        </div>
      </div>
    </section>
  );
}
