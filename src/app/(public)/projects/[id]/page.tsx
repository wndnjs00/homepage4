import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

import { getProject, listProjects, resolveProjectImage } from '@/backend/modules/project/project.service';
import { PageHero } from '@/frontend/components/layout/PageHero';
import { Chips } from '@/frontend/components/ui/Chips';
import { Section } from '@/frontend/components/ui/Section';
import { ProjectDetailView } from '@/frontend/features/projects/components/ProjectDetailView';
import { ROUTES } from '@/shared/constants/routes';
import { idParamSchema } from '@/shared/schemas/route-params';

type Props = { params: Promise<{ id: string }> };

export const dynamicParams = false;

export async function generateStaticParams() {
  return (await listProjects()).map((p) => ({ id: String(p.id) }));
}

async function load(params: Props['params']) {
  const parsed = idParamSchema.safeParse(await params);
  return parsed.success ? getProject(parsed.data.id) : null;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  return { title: (await load(params))?.title ?? 'Projects' };
}

export default async function ProjectDetailPage({ params }: Props) {
  const project = (await load(params)) ?? notFound();
  return (
    <>
      <PageHero
        image="/images/phero-project.jpg"
        crumbs={[{ label: 'Projects', href: ROUTES.projects }, { label: project.type }]}
        title={project.title}
        compact
        chips={<Chips items={[project.type, project.status, project.year]} />}
      />
      <Section tone="white">
        <ProjectDetailView project={project} image={resolveProjectImage(project)} />
      </Section>
    </>
  );
}
