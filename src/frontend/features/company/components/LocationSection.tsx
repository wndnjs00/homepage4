import type { ReactNode } from 'react';

import { Section, SectionHead } from '@/frontend/components/ui/Section';
import { COMPANY_INFO } from '@/shared/constants/navigation';

const valueClass = 'mt-3.5 block text-[17px] leading-[1.6] font-medium tracking-[-.02em]';
const linkClass = `${valueClass} transition-colors duration-300 hover:text-accent-deep`;

function InfoCell({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div className="pt-7 pr-6 pb-12 [&+&]:border-l [&+&]:border-line [&+&]:pl-6 max-tab:[&:nth-child(3)]:border-l-0 max-tab:[&:nth-child(3)]:pl-0 max-mob:!border-l-0 max-mob:!px-0 max-mob:py-6 max-mob:[&+&]:border-t">
      <div className="font-mono text-[11px] uppercase tracking-[.08em] text-muted">{label}</div>
      {children}
    </div>
  );
}

/** 회사소개 02 오시는 길: 지도 + 연락처 */
export function LocationSection() {
  return (
    <Section tone="paper" id="location">
      <SectionHead
        eyebrow="02 — Location"
        title="오시는 길"
        description="서울 중구 수표로 23, 인농빌딩 1001호 · 1101호에 위치하고 있습니다."
      />
      <div className="rv border-t border-ink bg-ink">
        <iframe
          title="미래아이엔텍 위치 지도"
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          src={COMPANY_INFO.mapEmbed}
          className="block aspect-[21/9] w-full border-0 grayscale-[.85] contrast-[1.05] max-mob:aspect-[4/3]"
        />
      </div>
      <div className="grid grid-cols-4 max-tab:grid-cols-2 max-mob:grid-cols-1">
        <InfoCell label="Address">
          <div className={valueClass}>
            서울시 중구 수표로 23
            <br />
            1001호, 1101호
            <small className="mt-1 block text-[13px] font-normal text-muted">23 Supyo-ro, Jung-gu, Seoul</small>
          </div>
        </InfoCell>
        <InfoCell label="Tel">
          <a className={linkClass} href={COMPANY_INFO.telHref}>
            {COMPANY_INFO.tel}
          </a>
        </InfoCell>
        <InfoCell label="Fax">
          <div className={valueClass}>{COMPANY_INFO.fax}</div>
        </InfoCell>
        <InfoCell label="Map">
          <a className={linkClass} href={COMPANY_INFO.mapLink} target="_blank" rel="noopener">
            지도 크게 보기 ↗
            <small className="mt-1 block text-[13px] font-normal text-muted">37.5632° N, 126.9901° E</small>
          </a>
        </InfoCell>
      </div>
    </Section>
  );
}
