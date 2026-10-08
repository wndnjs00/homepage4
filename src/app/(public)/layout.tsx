import type { ReactNode } from 'react';

import { buildSearchIndex } from '@/backend/modules/search/search.service';
import { Footer } from '@/frontend/components/layout/Footer';
import { RevealObserver } from '@/frontend/components/layout/RevealObserver';
import { SiteChrome } from '@/frontend/components/layout/SiteChrome';

export default async function PublicLayout({ children }: { children: ReactNode }) {
  const searchIndex = await buildSearchIndex();
  return (
    <>
      <SiteChrome searchIndex={searchIndex} />
      <main>{children}</main>
      <Footer />
      <RevealObserver />
    </>
  );
}
