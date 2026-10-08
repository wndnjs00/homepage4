import { listBusinessLines } from '@/backend/modules/business/business.service';
import { getHomeClientRows } from '@/backend/modules/client/client.service';
import { listLatestNews } from '@/backend/modules/news/news.service';
import { ButtonLink } from '@/frontend/components/ui/Button';
import { Section, SectionHead } from '@/frontend/components/ui/Section';
import { BusinessLineGrid } from '@/frontend/features/business/components/BusinessLineGrid';
import { ClientsMarquee } from '@/frontend/features/home/components/ClientsMarquee';
import { CompanyIntro } from '@/frontend/features/home/components/CompanyIntro';
import { HeroSection } from '@/frontend/features/home/components/HeroSection';
import { PartnerSection } from '@/frontend/features/home/components/PartnerSection';
import { NewsList } from '@/frontend/features/news/components/NewsList';
import { ROUTES } from '@/shared/constants/routes';

export default async function HomePage() {
  const [clientRows, lines, news] = await Promise.all([getHomeClientRows(), listBusinessLines(), listLatestNews(4)]);
  return (
    <>
      <HeroSection />
      <ClientsMarquee rows={clientRows} />
      <CompanyIntro />
      <PartnerSection />
      <Section tone="paper" id="business">
        <SectionHead
          eyebrow="02 — Business"
          title={<>네 개의 축으로<br />금융 IT 전 영역을 담당합니다</>}
          description="IT Outsourcing · System Integration · Infrastructure · Solution. 서로 다른 네 개의 사업 영역을 하나의 운영 체계로 연결해, 기획부터 구축·운영까지 끊김 없이 이어지는 서비스를 제공합니다."
        />
        <BusinessLineGrid lines={lines} />
      </Section>
      <Section tone="white" id="news">
        <SectionHead eyebrow="03 — News" title="News & Notices" description="미래아이엔텍의 주요 사업 수주 소식과 공지사항을 전합니다." />
        <NewsList items={news} />
        <div className="mt-10 flex justify-center">
          <ButtonLink href={ROUTES.news} variant="outline">
            전체보기
          </ButtonLink>
        </div>
      </Section>
    </>
  );
}
