import type { ReactNode } from 'react';

import { cn } from '@/frontend/lib/cn';

export function Chip({ children, accent = false }: { children: ReactNode; accent?: boolean }) {
  return (
    <span
      className={cn(
        'border px-3 py-1.5 font-mono text-[11px] tracking-[.06em]',
        accent ? 'border-accent bg-accent text-ink' : 'border-line-d text-muted-d',
      )}
    >
      {children}
    </span>
  );
}

/** 페이지 히어로 하단 태그 묶음. 첫 번째 항목을 초록색으로 강조 */
export function Chips({ items, children }: { items?: ReactNode[]; children?: ReactNode }) {
  return (
    <div className="mt-8 flex flex-wrap gap-2">
      {items?.map((item, i) => (
        <Chip key={i} accent={i === 0}>
          {item}
        </Chip>
      ))}
      {children}
    </div>
  );
}
