'use client';

import { usePathname } from 'next/navigation';

import { useReveal } from '@/frontend/hooks/use-reveal';

/** 페이지마다 스크롤 등장 애니메이션(.rv)을 연결 */
export function RevealObserver() {
  const pathname = usePathname();
  useReveal([pathname]);
  return null;
}
