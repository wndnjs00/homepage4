import { DetailBody, DetailLayout, DetailSide, TextOrPlaceholder } from '@/frontend/components/ui/Detail';
import { Figure } from '@/frontend/components/ui/Figure';
import type { Project, TeamProject } from '@/shared/types/content';

type ProjectLike = Pick<Project | TeamProject, 'title' | 'type' | 'status' | 'period' | 'client' | 'overview' | 'description'>;

/** 프로젝트 상세 (프로젝트 목록 · 팀 전용 프로젝트 공용) */
export function ProjectDetailView({ project: p, image }: { project: ProjectLike; image: string }) {
  return (
    <DetailLayout
      body={
        <DetailBody>
          <Figure src={image} alt={`${p.title} 관련 이미지`} caption={`${p.title}${p.client ? ` — ${p.client}` : ''}`} />
          <h2>Project Overview</h2>
          <p>
            <TextOrPlaceholder value={p.overview} />
          </p>
          <h2>Description</h2>
          <p>
            <TextOrPlaceholder value={p.description} />
          </p>
        </DetailBody>
      }
      side={
        <DetailSide
          rows={[
            { label: 'Type', value: <TextOrPlaceholder value={p.type} /> },
            { label: 'Status', value: <TextOrPlaceholder value={p.status} /> },
            { label: 'Name', value: p.title },
            { label: 'Period', value: <TextOrPlaceholder value={p.period} /> },
            { label: 'Client', value: <TextOrPlaceholder value={p.client} /> },
          ]}
        />
      }
    />
  );
}
