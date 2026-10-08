import { Fragment } from 'react';

import { BulletList, DetailBody, PLACEHOLDER_TEXT } from '@/frontend/components/ui/Detail';
import { Figure } from '@/frontend/components/ui/Figure';
import type { BusinessLine } from '@/shared/types/content';

import { ClientLogos } from './ClientLogos';
import { ServiceFeatureTabs } from './ServiceFeatureTabs';

const Placeholder = () => <p className="ph">{PLACEHOLDER_TEXT}</p>;

/** 사업 영역 상세: 개요 · 세부 섹션 · Service Features 탭 · Main Clients */
export function BusinessLineDetail({ line: b }: { line: BusinessLine }) {
  return (
    <DetailBody className="max-w-[920px]">
      <h2>{b.enTitle} 개요</h2>
      {b.summary.map((p) => (
        <p key={p}>{p}</p>
      ))}
      {b.sections.map((s) => (
        <Fragment key={s.heading}>
          <h2>{s.heading}</h2>
          {s.paragraphs.map((p) => (
            <p key={p}>{p}</p>
          ))}
          {s.items.length > 0 && <BulletList items={s.items} />}
        </Fragment>
      ))}
      <Figure src={b.image} alt={`${b.title} 관련 이미지`} caption={`${b.title} — ${b.enTitle}`} />
      {b.features && (
        <>
          <h2>Service Features</h2>
          {b.features.length ? <ServiceFeatureTabs features={b.features} /> : <Placeholder />}
        </>
      )}
      {b.clients && (
        <>
          <h2>Main Clients</h2>
          {b.clients.length ? <ClientLogos clients={b.clients} /> : <Placeholder />}
        </>
      )}
    </DetailBody>
  );
}
