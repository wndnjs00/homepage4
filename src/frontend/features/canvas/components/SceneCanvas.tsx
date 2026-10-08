'use client';

import { useEffect, useRef } from 'react';

import { startHeroScene } from '../lib/hero-scene';
import { startTechScene } from '../lib/tech-scene';

const SCENES = {
  hero: startHeroScene,
  tech: startTechScene,
} as const;

/** 캔버스 애니메이션 (hero: 메인 격자 / tech: 점 구체) */
export function SceneCanvas({ scene, className }: { scene: keyof typeof SCENES; className?: string }) {
  const ref = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    if (!ref.current) return;
    return SCENES[scene](ref.current);
  }, [scene]);
  return <canvas ref={ref} className={className} />;
}
