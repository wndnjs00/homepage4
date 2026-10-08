import { Fragment } from 'react';

import { BulletList, DetailBody } from '@/frontend/components/ui/Detail';
import { asset } from '@/frontend/lib/asset';
import type { Team, TeamProjectLink } from '@/shared/types/content';

import { RelatedProjects } from './RelatedProjects';

const paragraphs = (items: string[]) => items.map((p) => <p key={p}>{p}</p>);

/** 팀 상세: CEO 는 사진 + 약력, 팀은 소개 · 주요 기능 · 핵심 역량 */
export function TeamDetailView({ team, relatedProjects }: { team: Team; relatedProjects: TeamProjectLink[] }) {
  const name = team.personName ? `${team.personName} ${team.title}` : team.title;
  return (
    <>
      {team.slug === 'ceo' ? (
        <div className="grid grid-cols-12 items-start gap-6">
          <figure className="ceo-ph rv col-[1/6] max-tab:col-span-full max-tab:max-w-[480px]">
            {/* eslint-disable-next-line @next/next/no-img-element -- 정적 내보내기(이미지 최적화 미사용) */}
            <img src={asset(team.image ?? '/images/ceo.jpg')} alt={`미래아이엔텍 ${name} 사진`} />
            <figcaption>{team.personName} · 대표이사 (CEO)</figcaption>
          </figure>
          <DetailBody className="d1 col-[7/13] max-tab:col-span-full max-tab:mt-4">
            {team.bio?.map((group) => (
              <Fragment key={group.heading}>
                <h2>{group.heading}</h2>
                <BulletList items={group.items} />
              </Fragment>
            ))}
          </DetailBody>
        </div>
      ) : (
        <DetailBody className="max-w-[920px]">
          <h2>Team Introduction</h2>
          {paragraphs(team.intro)}
          <h2>Main Functions</h2>
          <BulletList items={team.functions} />
          <h2>Key Capabilities</h2>
          <BulletList items={team.capabilities} />
        </DetailBody>
      )}
      <div className="rv mt-[clamp(64px,8vw,110px)]">
        <RelatedProjects teamTitle={team.title} projects={relatedProjects} />
      </div>
    </>
  );
}
