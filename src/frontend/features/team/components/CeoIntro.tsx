import Link from 'next/link';

import { Arrow } from '@/frontend/components/ui/Button';
import { Eyebrow } from '@/frontend/components/ui/Eyebrow';
import { Facts } from '@/frontend/components/ui/Facts';
import { asset } from '@/frontend/lib/asset';
import { ROUTES } from '@/shared/constants/routes';

/** 팀 페이지 01 대표이사 */
export function CeoIntro() {
  return (
    <div className="grid grid-cols-12 items-start gap-6">
      <Link
        className="ceo-ph rv col-[1/6] max-tab:col-span-full max-tab:max-w-[480px]"
        href={ROUTES.teamDetail('ceo')}
        aria-label="대표이사 상세 보기"
      >
        {/* eslint-disable-next-line @next/next/no-img-element -- 정적 내보내기(이미지 최적화 미사용) */}
        <img src={asset('/images/ceo.jpg')} alt="미래아이엔텍 김학연 대표이사 사진" />
        <span className="ceo-cap">
          김학연 · 대표이사 (CEO) <Arrow />
        </span>
      </Link>
      <div className="rv d1 col-[7/13] max-tab:col-span-full max-tab:mt-4">
        <Eyebrow>CEO Message</Eyebrow>
        <h3 className="mt-7 text-[clamp(32px,3.4vw,52px)] leading-[1.2] font-bold tracking-[-.04em]">
          김학연{' '}
          <small className="ml-2 align-middle font-mono text-[.3em] font-medium tracking-[.12em] text-muted">KIM HAKYUN</small>
        </h3>
        <p className="mt-2 font-mono text-[12px] tracking-[.06em] text-accent-deep">대표이사 | CEO</p>
        <p className="mt-7 text-[clamp(17px,1.35vw,20px)] leading-[1.8] font-medium tracking-[-.02em]">
          미래아이엔텍은 2003년 설립 이래 금융권 IT에 특화된 전문기업으로, SI·ITO·컨설팅 등 IT 전 분야에 걸쳐 차별화된
          서비스를 제공해 왔습니다. 축적된 경험과 기술 노하우를 바탕으로 고객의 디지털 전환을 안정적으로 지원합니다.
        </p>
        <blockquote className="mt-8 border-l-2 border-accent py-1 pl-6 text-[clamp(20px,1.8vw,26px)] leading-[1.4] font-bold tracking-[-.03em]">
          “금융 IT 혁신을 이끄는 제2의 도약”
        </blockquote>
        <Facts
          compact
          reveal={false}
          items={[
            { label: 'Appointed', value: '2026. 03', description: '신임 대표이사 선임' },
            { label: 'Focus', value: '금융 IT', description: '금융권 디지털 전환 · ITSM 사업 강화' },
          ]}
        />
      </div>
    </div>
  );
}
