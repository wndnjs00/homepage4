import type { Metadata } from 'next';
import type { ReactNode } from 'react';

import '@/frontend/styles/globals.css';

export const metadata: Metadata = {
  title: { default: '미래아이엔텍 | Mirae I&Tec', template: '%s | 미래아이엔텍' },
  description:
    '미래아이엔텍은 2003년 설립 이래 금융권 IT에 특화된 전문기업으로, ITO·SI·인프라·솔루션 등 IT 전 분야에 걸쳐 차별화된 서비스를 제공합니다.',
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="ko">
      <body style={{ backgroundColor: 'rgb(224, 224, 203)' }}>{children}</body>
    </html>
  );
}
