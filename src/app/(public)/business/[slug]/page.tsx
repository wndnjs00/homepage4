import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

import { getBusinessLine, listBusinessLines } from '@/backend/modules/business/business.service';
import { PageHero } from '@/frontend/components/layout/PageHero';
import { Chips } from '@/frontend/components/ui/Chips';
import { Section } from '@/frontend/components/ui/Section';
import { BusinessLineDetail } from '@/frontend/features/business/components/BusinessLineDetail';
import { ROUTES } from '@/shared/constants/routes';
import { slugParamSchema } from '@/shared/schemas/route-params';

type Props = { params: Promise<{ slug: string }> };

export const dynamicParams = false;

export async function generateStaticParams() {
  return (await listBusinessLines()).map((b) => ({ slug: b.slug }));
}

async function load(params: Props['params']) {
  const parsed = slugParamSchema.safeParse(await params);
  return parsed.success ? getBusinessLine(parsed.data.slug) : null;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  return { title: (await load(params))?.title ?? 'Business Line' };
}

export default async function BusinessLinePage({ params }: Props) {
  const line = (await load(params)) ?? notFound();
  return (
    <>
      <PageHero
        image="/images/phero-business.jpg"
        crumbs={[{ label: 'Business Line', href: ROUTES.business }, { label: line.enTitle }]}
        title={line.title}
        lead={line.description}
        chips={<Chips items={[line.no, ...line.points.slice(0, 4)]} />}
      />
      <Section tone="white">
        <BusinessLineDetail line={line} />
      </Section>
    </>
  );
}
