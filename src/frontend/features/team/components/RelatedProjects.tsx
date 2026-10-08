'use client';

import Link from 'next/link';
import { useState } from 'react';

import { Button } from '@/frontend/components/ui/Button';
import { pad2 } from '@/frontend/lib/cn';
import type { TeamProjectLink } from '@/shared/types/content';

const LIMIT = 5;
const headingClass = 'mb-7 text-[clamp(26px,2.6vw,40px)] font-bold tracking-[-.035em]';

/** 팀 Related Projects: 5개까지 보여주고 '더보기'로 전체 표시 */
export function RelatedProjects({ teamTitle, projects }: { teamTitle: string; projects: TeamProjectLink[] }) {
  const [expanded, setExpanded] = useState(false);

  if (!projects.length) {
    return (
      <>
        <h2 className={headingClass}>Related Projects</h2>
        <div className="border-t border-ink py-10 text-muted">
          <b className="mb-2 block text-[18px] text-ink">프로젝트 소개를 준비하고 있습니다.</b>
          <p>
            {teamTitle}의 다양한 연구 활동과 프로젝트를 소개할 예정입니다. 앞으로 이곳에서 연구소의 새로운 소식과 활동을 만나보실
            수 있습니다.
          </p>
        </div>
      </>
    );
  }

  const shown = expanded ? projects : projects.slice(0, LIMIT);
  return (
    <>
      <h2 className={headingClass}>
        Related Projects{' '}
        <sup className="ml-2 align-super font-mono text-[12px] font-normal text-accent-deep">{pad2(projects.length)}</sup>
      </h2>
      <div className="plist">
        {shown.map((p) => (
          <Link key={p.href + p.title} className="prow rp" href={p.href}>
            <span className="yr">{p.year}</span>
            <span className="tt">{p.title}</span>
            <span className="go" />
          </Link>
        ))}
      </div>
      {!expanded && projects.length > LIMIT && (
        <div className="mt-10 flex justify-center">
          <Button variant="outline" onClick={() => setExpanded(true)}>
            더보기
          </Button>
        </div>
      )}
    </>
  );
}
