import type { Metadata } from 'next';

import { listProjects } from '@/backend/modules/project/project.service';
import { PageHero } from '@/frontend/components/layout/PageHero';
import { Chip } from '@/frontend/components/ui/Chips';
import { Section } from '@/frontend/components/ui/Section';
import { ProjectCountChip } from '@/frontend/features/projects/components/ProjectCountChip';
import { ProjectExplorer } from '@/frontend/features/projects/components/ProjectExplorer';
import { ProjectFilterProvider } from '@/frontend/features/projects/hooks/project-filter-context';

export const metadata: Metadata = { title: 'Projects' };

export default async function ProjectsPage() {
  const projects = await listProjects();
  return (
    <ProjectFilterProvider projects={projects}>
      <PageHero
        image="/images/phero-projects.jpg"
        crumbs={[{ label: 'Business' }, { label: 'Projects' }]}
        title="Projects"
        lead="금융권을 중심으로 수행한 미래아이엔텍의 프로젝트입니다. Type · Industry · Status별로 필터링하여 확인할 수 있습니다."
        chips={
          <div className="mt-8 flex flex-wrap gap-2">
            <ProjectCountChip />
            <Chip>SI · ITO · Solution</Chip>
          </div>
        }
      />
      <Section tone="paper">
        <ProjectExplorer />
      </Section>
    </ProjectFilterProvider>
  );
}
