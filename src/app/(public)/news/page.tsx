import type { Metadata } from 'next';

import { listNews } from '@/backend/modules/news/news.service';
import { PageHero } from '@/frontend/components/layout/PageHero';
import { Section } from '@/frontend/components/ui/Section';
import { NewsList } from '@/frontend/features/news/components/NewsList';

export const metadata: Metadata = { title: 'News&Notices' };

export default async function NewsPage() {
  const news = await listNews();
  return (
    <>
      <PageHero
        image="/images/phero-news.jpg"
        crumbs={[{ label: 'Company' }, { label: 'News&Notices' }]}
        title="News&Notices"
        lead="미래아이엔텍의 주요 사업 수주 소식과 공지사항입니다."
      />
      <Section tone="white">
        <NewsList items={news} />
      </Section>
    </>
  );
}
