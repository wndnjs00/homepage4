import type { ReactNode } from 'react';

import { cn } from '@/frontend/lib/cn';

import { Eyebrow } from './Eyebrow';

type Tone = 'white' | 'paper' | 'dark';

const TONE_CLASS: Record<Tone, string> = {
  white: 'bg-white',
  paper: 'bg-paper',
  // .dark 는 하위 요소(facts 등)의 어두운 배경용 스타일 기준 클래스
  dark: 'dark bg-ink text-paper',
};

interface SectionProps {
  tone?: Tone;
  id?: string;
  className?: string;
  children: ReactNode;
}

/** 페이지 섹션 (상하 여백 + 배경 톤) */
export function Section({ tone = 'white', id, className, children }: SectionProps) {
  return (
    <section id={id} className={cn('py-[clamp(96px,12vw,180px)]', TONE_CLASS[tone], className)}>
      <div className="wrap">{children}</div>
    </section>
  );
}

interface SectionHeadProps {
  eyebrow: ReactNode;
  title: ReactNode;
  description?: ReactNode;
  tone?: 'light' | 'dark';
}

/** 섹션 제목 영역: 라벨 / 큰 제목(7칸) / 설명(4칸) */
export function SectionHead({ eyebrow, title, description, tone = 'light' }: SectionHeadProps) {
  return (
    <div className="mb-[clamp(56px,7vw,100px)] grid grid-cols-12 items-end gap-6">
      <Eyebrow tone={tone} className="rv col-span-full mb-2">
        {eyebrow}
      </Eyebrow>
      <h2 className="rv d1 col-[1/8] text-[clamp(34px,4.4vw,68px)] font-bold leading-[1.16] tracking-[-.04em] max-tab:col-span-full">
        {title}
      </h2>
      {description && (
        <p
          className={cn(
            'rv d2 col-[9/13] text-[16px] leading-[1.85] max-tab:col-span-full max-tab:max-w-[60ch]',
            tone === 'dark' ? 'text-muted-d' : 'text-muted',
          )}
        >
          {description}
        </p>
      )}
    </div>
  );
}
