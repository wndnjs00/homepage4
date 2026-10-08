import Link from 'next/link';
import type { ComponentProps, ReactNode } from 'react';

import { cn } from '@/frontend/lib/cn';

type Variant = 'plain' | 'accent' | 'ghost' | 'ink' | 'outline';

const VARIANT_CLASS: Record<Variant, string> = {
  plain: '',
  accent: 'btn-accent',
  ghost: 'btn-ghost',
  ink: 'btn-ink',
  // 밝은 배경의 테두리 버튼 (더보기·전체보기)
  outline: 'border-ink hover:bg-ink hover:text-paper',
};

/** 버튼 우측 화살표 (호버 시 늘어남) */
export function Arrow({ back = false }: { back?: boolean }) {
  return <span className={cn('arr', back && 'back')} />;
}

interface ButtonLinkProps extends Omit<ComponentProps<typeof Link>, 'className'> {
  variant?: Variant;
  className?: string;
  children: ReactNode;
}

export function ButtonLink({ variant = 'plain', className, children, ...props }: ButtonLinkProps) {
  return (
    <Link className={cn('btn', VARIANT_CLASS[variant], className)} {...props}>
      {children} <Arrow />
    </Link>
  );
}

interface ButtonProps extends Omit<ComponentProps<'button'>, 'className'> {
  variant?: Variant;
  className?: string;
}

export function Button({ variant = 'plain', className, children, type = 'button', ...props }: ButtonProps) {
  return (
    <button type={type} className={cn('btn', VARIANT_CLASS[variant], className)} {...props}>
      {children} <Arrow />
    </button>
  );
}

interface ArrowLinkProps extends Omit<ComponentProps<typeof Link>, 'className'> {
  className?: string;
  children: ReactNode;
}

/** 텍스트 + 화살표 링크 (예: 회사 소개 자세히 보기 →) */
export function ArrowLink({ className, children, ...props }: ArrowLinkProps) {
  return (
    <Link className={cn('lnk', className)} {...props}>
      {children} <Arrow />
    </Link>
  );
}
