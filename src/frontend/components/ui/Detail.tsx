import type { ReactNode } from 'react';

import { cn } from '@/frontend/lib/cn';

export const PLACEHOLDER_TEXT = '설명이 들어갈 내용입니다.';

/** 상세 2단 레이아웃: 본문 7칸 + 사이드 4칸 (태블릿 이하 1단) */
export function DetailLayout({ body, side }: { body: ReactNode; side: ReactNode }) {
  return (
    <div className="grid grid-cols-12 items-start gap-6">
      <div className="col-[1/8] max-tab:col-span-full">{body}</div>
      <div className="sticky top-[110px] col-[9/13] max-tab:static max-tab:col-span-full max-tab:mt-8">{side}</div>
    </div>
  );
}

/** 본문 타이포그래피 (h2 상단 선, 초록 사각 불릿 목록 등) */
export function DetailBody({ children, className }: { children: ReactNode; className?: string }) {
  return <div className={cn('dtl-body rv', className)}>{children}</div>;
}

export interface DetailRow {
  label: string;
  value: ReactNode;
}

/** 우측 정보 표 (Company / Established …) */
export function DetailSide({ rows, className }: { rows: DetailRow[]; className?: string }) {
  return (
    <aside className={cn('dtl-side rv d1', className)}>
      <dl>
        {rows.map((r) => (
          <div key={r.label}>
            <dt>{r.label}</dt>
            <dd>{r.value}</dd>
          </div>
        ))}
      </dl>
    </aside>
  );
}

/** 값이 없으면 placeholder 문구 */
export function TextOrPlaceholder({ value }: { value?: string | number }) {
  return value ? <>{value}</> : <span className="ph">{PLACEHOLDER_TEXT}</span>;
}

/** 줄바꿈(\n)을 <br> 로 표시하는 목록 */
export function BulletList({ items }: { items: string[] }) {
  return (
    <ul>
      {items.map((item) => (
        <li key={item}>
          {item.split('\n').map((line, i) => (
            <span key={i}>
              {i > 0 && <br />}
              {line}
            </span>
          ))}
        </li>
      ))}
    </ul>
  );
}
