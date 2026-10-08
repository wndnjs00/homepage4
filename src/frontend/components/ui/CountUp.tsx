'use client';

import { useEffect, useRef, useState } from 'react';

import { pad2 } from '@/frontend/lib/cn';

const DURATION = 1400;

/** 화면에 보이면 0 → to 로 올라가는 숫자 (2자리 표시) */
export function CountUp({ to }: { to: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const [value, setValue] = useState(0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let raf = 0;
    const io = new IntersectionObserver(
      ([e]) => {
        if (!e.isIntersecting) return;
        io.disconnect();
        if (matchMedia('(prefers-reduced-motion: reduce)').matches) {
          setValue(to);
          return;
        }
        const t0 = performance.now();
        const step = (t: number) => {
          const k = Math.min(1, (t - t0) / DURATION);
          setValue(Math.round(to * (1 - Math.pow(1 - k, 3))));
          if (k < 1) raf = requestAnimationFrame(step);
        };
        raf = requestAnimationFrame(step);
      },
      { threshold: 0.5 },
    );
    io.observe(el);
    return () => {
      io.disconnect();
      cancelAnimationFrame(raf);
    };
  }, [to]);

  return <span ref={ref}>{pad2(value)}</span>;
}
