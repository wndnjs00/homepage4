'use client';

import { useSyncExternalStore } from 'react';

const format = () => new Date().toLocaleTimeString('en-GB', { timeZone: 'Asia/Seoul', hour12: false });

// 1초마다 구독자에게 갱신 알림
const subscribe = (onChange: () => void) => {
  const id = setInterval(onChange, 1000);
  return () => clearInterval(id);
};

/** 서울 현재 시각 (1초마다 갱신). 서버 렌더 시에는 자리표시 문자열 */
export function SeoulClock() {
  const time = useSyncExternalStore(subscribe, format, () => '--:--:--');
  return <b>{time}</b>;
}
