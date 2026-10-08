import type { Metadata } from 'next';

import { PageHero } from '@/frontend/components/layout/PageHero';
import { Chips } from '@/frontend/components/ui/Chips';
import { CompanyIntroduction } from '@/frontend/features/company/components/CompanyIntroduction';
import { LocationSection } from '@/frontend/features/company/components/LocationSection';

export const metadata: Metadata = { title: 'Mirae I&Tec' };

export default function CompanyPage() {
  return (
    <>
      <PageHero
        image="/images/phero-company.jpg"
        crumbs={[{ label: 'Company' }, { label: 'Mirae I&Tec' }]}
        title="Mirae I&Tec"
        lead="최고의 기술력과 비즈니스에 대한 깊이 있는 이해를 바탕으로 고객의 Digital transformation을 실현합니다."
        chips={<Chips items={['Est. 2003', '금융 IT 전문', '서울 중구 수표로 23']} />}
      />
      <CompanyIntroduction />
      <LocationSection />
    </>
  );
}
