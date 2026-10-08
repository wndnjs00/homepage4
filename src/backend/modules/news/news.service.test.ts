import { describe, expect, it } from 'vitest';

import { getNewsDetail, listLatestNews, listNews } from './news.service';

describe('news.service', () => {
  it('최신 뉴스를 지정 개수만큼 반환한다', async () => {
    const all = await listNews();
    const latest = await listLatestNews(4);
    expect(latest).toHaveLength(4);
    expect(latest).toEqual(all.slice(0, 4));
  });

  it('상세: 순번과 전체 개수, 기본 이미지를 함께 반환한다', async () => {
    const detail = await getNewsDetail(2);
    expect(detail?.news.id).toBe(2);
    expect(detail?.position).toBe(2);
    expect(detail?.total).toBe((await listNews()).length);
    // 이미지가 없는 게시물은 순서대로 기본 이미지를 배정 (2번째 → feat-3)
    expect(detail?.image).toBe('/images/feat-3.jpg');
  });

  it('없는 id 는 null', async () => {
    expect(await getNewsDetail(9999)).toBeNull();
  });
});
