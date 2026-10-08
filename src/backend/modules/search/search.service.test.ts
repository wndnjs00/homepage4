import { describe, expect, it } from 'vitest';

import { buildSearchIndex } from './search.service';

describe('search.service', () => {
  it('뉴스 → 프로젝트 → 사업 영역 순서로 색인한다', async () => {
    const index = await buildSearchIndex();
    const kinds = index.map((i) => (i.kind === 'NEWS' || i.kind === 'BUSINESS' ? i.kind : 'PROJECT'));
    expect(kinds.indexOf('PROJECT')).toBeGreaterThan(kinds.lastIndexOf('NEWS'));
    expect(kinds.indexOf('BUSINESS')).toBeGreaterThan(kinds.lastIndexOf('PROJECT'));
  });

  it('검색어는 소문자로 비교할 수 있게 저장한다', async () => {
    const index = await buildSearchIndex();
    const sc = index.filter((i) => i.keywords.includes('sc제일은행'));
    expect(sc.length).toBeGreaterThan(0);
    expect(index.every((i) => i.keywords === i.keywords.toLowerCase())).toBe(true);
  });
});
