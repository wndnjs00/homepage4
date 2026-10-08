import type { Metadata } from 'next';

import { listBusinessLines } from '@/backend/modules/business/business.service';
import { PageHero } from '@/frontend/components/layout/PageHero';
import { Chips } from '@/frontend/components/ui/Chips';
import { Section } from '@/frontend/components/ui/Section';
import { BusinessLineGrid } from '@/frontend/features/business/components/BusinessLineGrid';

export const metadata: Metadata = { title: 'Business Line' };

export default async function BusinessPage() {
  const lines = await listBusinessLines();
  return (
    <>
      <PageHero
        image="/images/phero-business.jpg"
        crumbs={[{ label: 'Business' }, { label: 'Business Line' }]}
        title="Business Line"
        lead="IT Outsourcing · System Integration · Infrastructure · Solution. 네 개의 사업 영역으로 금융 IT의 전 단계를 지원합니다."
        chips={<Chips items={['4 Business Lines']} />}
      />
      <Section tone="paper">
        <BusinessLineGrid lines={lines} />
      </Section>
    </>
  );
}
