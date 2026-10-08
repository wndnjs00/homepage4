import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

import { getNewsDetail, listNews } from '@/backend/modules/news/news.service';
import { PageHero } from '@/frontend/components/layout/PageHero';
import { Chips } from '@/frontend/components/ui/Chips';
import { Section } from '@/frontend/components/ui/Section';
import { NewsDetailView } from '@/frontend/features/news/components/NewsDetailView';
import { ROUTES } from '@/shared/constants/routes';
import { idParamSchema } from '@/shared/schemas/route-params';

type Props = { params: Promise<{ id: string }> };

export const dynamicParams = false;

export async function generateStaticParams() {
  return (await listNews()).map((n) => ({ id: String(n.id) }));
}

async function load(params: Props['params']) {
  const parsed = idParamSchema.safeParse(await params);
  return parsed.success ? getNewsDetail(parsed.data.id) : null;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const detail = await load(params);
  return { title: detail?.news.title ?? 'News&Notices' };
}

export default async function NewsDetailPage({ params }: Props) {
  const detail = (await load(params)) ?? notFound();
  const { news } = detail;
  return (
    <>
      <PageHero
        image="/images/phero-news.jpg"
        crumbs={[{ label: 'News&Notices', href: ROUTES.news }, { label: news.tag }]}
        title={news.title}
        compact
        chips={<Chips items={[news.tag, news.publishedOn, '미래아이엔텍']} />}
      />
      <Section tone="white">
        <NewsDetailView {...detail} />
      </Section>
    </>
  );
}
