'use client';

import { useEffect } from 'react';

/**
 * .rv 요소가 화면에 들어오면 .on 을 붙여 등장 애니메이션을 실행한다 (1회)
 * deps 가 바뀔 때(페이지 이동) 새로 그려진 요소를 다시 관찰한다
 */
export function useReveal(deps: unknown[]) {
  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (!e.isIntersecting) return;
          e.target.classList.add('on');
          io.unobserve(e.target);
        }),
      { threshold: 0.15, rootMargin: '0px 0px -40px 0px' },
    );
    document.querySelectorAll('.rv:not(.on)').forEach((el) => io.observe(el));
    return () => io.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps -- 호출부가 의존값(경로)을 지정
  }, deps);
}
