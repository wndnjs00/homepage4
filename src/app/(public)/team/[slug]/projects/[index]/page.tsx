import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

import { resolveProjectImage } from '@/backend/modules/project/project.service';
import { getTeamProject, listTeamOnlyProjectParams } from '@/backend/modules/team/team.service';
import { PageHero } from '@/frontend/components/layout/PageHero';
import { Chips } from '@/frontend/components/ui/Chips';
import { Section } from '@/frontend/components/ui/Section';
import { ProjectDetailView } from '@/frontend/features/projects/components/ProjectDetailView';
import { ROUTES } from '@/shared/constants/routes';
import { teamProjectParamSchema } from '@/shared/schemas/route-params';

type Props = { params: Promise<{ slug: string; index: string }> };

export const dynamicParams = false;

/** 프로젝트 목록에 없는 팀 전용 프로젝트만 생성 */
export async function generateStaticParams() {
  return (await listTeamOnlyProjectParams()).map((p) => ({ slug: p.slug, index: String(p.index) }));
}

async function load(params: Props['params']) {
  const parsed = teamProjectParamSchema.safeParse(await params);
  return parsed.success ? getTeamProject(parsed.data.slug, parsed.data.index) : null;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const found = await load(params);
  return { title: found?.project.title ?? 'Projects' };
}

export default async function TeamProjectPage({ params }: Props) {
  const { team, project } = (await load(params)) ?? notFound();
  return (
    <>
      <PageHero
        image="/images/phero-project.jpg"
        crumbs={[
          { label: 'Team', href: ROUTES.team },
          { label: team.title, href: ROUTES.teamDetail(team.slug) },
          { label: 'Related Projects' },
        ]}
        title={project.title}
        compact
        chips={<Chips items={[project.type, project.status, project.year].filter(Boolean)} />}
      />
      <Section tone="white">
        <ProjectDetailView project={project} image={resolveProjectImage(project)} />
      </Section>
    </>
  );
}
