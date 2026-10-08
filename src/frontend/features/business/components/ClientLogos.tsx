'use client';

import { useState } from 'react';

import { asset } from '@/frontend/lib/asset';
import type { Client } from '@/shared/types/content';

/** 로고 파일이 있으면 로고, 없거나 불러오지 못하면 회사명 */
function ClientTile({ client }: { client: Client }) {
  const [status, setStatus] = useState<'loading' | 'loaded' | 'error'>(client.logo ? 'loading' : 'error');
  return (
    <div
      title={client.name}
      className="flex h-[88px] items-center justify-center border-r border-b border-line bg-white p-4 text-center text-[15px] font-semibold tracking-[-.02em] transition-colors duration-300 hover:bg-ink hover:text-paper"
    >
      {status !== 'loaded' && <span>{client.name}</span>}
      {client.logo && status !== 'error' && (
        // eslint-disable-next-line @next/next/no-img-element -- 정적 내보내기(이미지 최적화 미사용)
        <img
          src={asset(client.logo)}
          alt={`${client.name} 로고`}
          className="max-h-11 max-w-full object-contain"
          hidden={status !== 'loaded'}
          onLoad={() => setStatus('loaded')}
          onError={() => setStatus('error')}
        />
      )}
    </div>
  );
}

export function ClientLogos({ clients }: { clients: Client[] }) {
  return (
    <div className="mt-5 grid grid-cols-[repeat(auto-fill,minmax(160px,1fr))] border-t border-l border-t-ink border-l-line">
      {clients.map((c) => (
        <ClientTile key={c.name} client={c} />
      ))}
    </div>
  );
}
