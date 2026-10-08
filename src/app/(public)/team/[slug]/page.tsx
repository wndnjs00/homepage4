import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

import { getTeamDetail, listTeams } from '@/backend/modules/team/team.service';
import { PageHero } from '@/frontend/components/layout/PageHero';
import { Chips } from '@/frontend/components/ui/Chips';
import { Section } from '@/frontend/components/ui/Section';
import { TeamDetailView } from '@/frontend/features/team/components/TeamDetailView';
import { ROUTES } from '@/shared/constants/routes';
import { slugParamSchema } from '@/shared/schemas/route-params';

type Props = { params: Promise<{ slug: string }> };

export const dynamicParams = false;

export async function generateStaticParams() {
  return (await listTeams()).map((t) => ({ slug: t.slug }));
}

async function load(params: Props['params']) {
  const parsed = slugParamSchema.safeParse(await params);
  return parsed.success ? getTeamDetail(parsed.data.slug) : null;
}

const displayName = (t: { personName?: string; title: string }) => (t.personName ? `${t.personName} ${t.title}` : t.title);

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const detail = await load(params);
  return { title: detail ? displayName(detail.team) : 'Team' };
}

export default async function TeamDetailPage({ params }: Props) {
  const detail = (await load(params)) ?? notFound();
  const { team } = detail;
  return (
    <>
      <PageHero
        image="/images/phero-team.jpg"
        crumbs={[{ label: 'Team', href: ROUTES.team }, { label: team.title }]}
        title={displayName(team)}
        lead={team.enTitle}
        chips={<Chips items={[team.slug === 'ceo' ? 'CEO' : 'Team', '미래아이엔텍']} />}
      />
      <Section tone="white">
        <TeamDetailView team={team} relatedProjects={detail.relatedProjects} />
      </Section>
    </>
  );
}
