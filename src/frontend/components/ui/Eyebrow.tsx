import type { ReactNode } from 'react';

import { cn } from '@/frontend/lib/cn';

interface EyebrowProps {
  children: ReactNode;
  tone?: 'light' | 'dark';
  className?: string;
}

/** 초록 사각형 + 모노 대문자 라벨 (예: 01 — Company) */
export function Eyebrow({ children, tone = 'light', className }: EyebrowProps) {
  return (
    <div
      className={cn(
        "flex items-center gap-3 font-mono text-[12px] uppercase tracking-[.08em] before:size-1.5 before:bg-accent before:content-['']",
        tone === 'dark' ? 'text-muted-d' : 'text-muted',
        className,
      )}
    >
      {children}
    </div>
  );
}
