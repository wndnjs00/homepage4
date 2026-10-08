import type { Metadata } from 'next';

import { PageHero } from '@/frontend/components/layout/PageHero';
import { Chips } from '@/frontend/components/ui/Chips';
import { Section, SectionHead } from '@/frontend/components/ui/Section';
import { CeoIntro } from '@/frontend/features/team/components/CeoIntro';
import { TeamGrid } from '@/frontend/features/team/components/TeamGrid';

export const metadata: Metadata = { title: 'Team' };

export default function TeamPage() {
  return (
    <>
      <PageHero
        image="/images/phero-team.jpg"
        crumbs={[{ label: 'Company' }, { label: 'Team' }]}
        title="Team"
        lead="대표이사를 중심으로 ITO·SI·인프라·솔루션, 그리고 미래기술연구소까지. 다섯 개 전문 조직이 금융 IT의 전 영역을 담당합니다."
        chips={<Chips items={['5 Expert Teams', 'CEO 김학연']} />}
      />
      <Section tone="white">
        <SectionHead eyebrow="01 — CEO" title="대표이사" />
        <CeoIntro />
      </Section>
      <Section tone="paper">
        <SectionHead
          eyebrow="02 — Organization"
          title="조직 구성"
          description="각 팀은 독립된 전문 영역을 담당하며, 프로젝트 단위로 유기적으로 협업합니다."
        />
        <TeamGrid />
      </Section>
    </>
  );
}
