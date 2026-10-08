'use client';

import { useState } from 'react';

import { BulletList, PLACEHOLDER_TEXT } from '@/frontend/components/ui/Detail';
import { Figure } from '@/frontend/components/ui/Figure';
import { cn } from '@/frontend/lib/cn';
import type { BusinessFeature } from '@/shared/types/content';

/** Service Features 탭 전환 */
export function ServiceFeatureTabs({ features }: { features: BusinessFeature[] }) {
  const [active, setActive] = useState(0);
  return (
    <>
      <div className="filters">
        {features.map((f, i) => (
          <button key={f.heading} type="button" className={cn(i === active && 'on')} onClick={() => setActive(i)}>
            {f.heading}
          </button>
        ))}
      </div>
      {features.map((f, i) => (
        <div key={f.heading} className="sfeat" hidden={i !== active}>
          {f.image && <Figure className="mt-0" src={f.image} alt={`${f.heading} 관련 이미지`} caption={f.heading} />}
          {f.paragraphs.map((p) => (
            <p key={p}>{p}</p>
          ))}
          {f.items.length > 0 ? (
            <BulletList items={f.items} />
          ) : (
            f.paragraphs.length === 0 && <p className="ph">{PLACEHOLDER_TEXT}</p>
          )}
        </div>
      ))}
    </>
  );
}
