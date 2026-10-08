import type { ReactNode } from 'react';

import { cn } from '@/frontend/lib/cn';

export interface FactItem {
  label: string;
  value: ReactNode;
  description: string;
}

/** 큰 숫자 지표 묶음 (상단 굵은 선 + 세로 구분선) */
export function Facts({ items, compact = false, reveal = true }: { items: FactItem[]; compact?: boolean; reveal?: boolean }) {
  return (
    <div className={cn('facts', compact && 'sm')}>
      {items.map((f, i) => (
        <div key={f.label} className={cn('fact', reveal && 'rv', reveal && i > 0 && `d${i}`)}>
          <div className="k">{f.label}</div>
          <div className="v">{f.value}</div>
          <div className="d">{f.description}</div>
        </div>
      ))}
    </div>
  );
}
