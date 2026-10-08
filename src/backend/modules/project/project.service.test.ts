import { describe, expect, it } from 'vitest';

import { findProjectIdByTitle, getProject, listProjects, resolveProjectImage } from './project.service';

describe('project.service', () => {
  it('id 로 프로젝트를 찾는다', async () => {
    const [first] = await listProjects();
    expect(await getProject(first.id)).toEqual(first);
    expect(await getProject(9999)).toBeNull();
  });

  it('제목으로 프로젝트 id 를 찾는다', async () => {
    const [first] = await listProjects();
    expect(await findProjectIdByTitle(first.title)).toBe(first.id);
    expect(await findProjectIdByTitle('존재하지 않는 프로젝트')).toBeNull();
  });

  it('이미지가 없으면 유형별 기본 이미지', () => {
    expect(resolveProjectImage({ type: 'SI' })).toBe('/images/feat-3.jpg');
    expect(resolveProjectImage({ type: 'ITO' })).toBe('/images/feat-2.jpg');
    expect(resolveProjectImage({ type: 'Solution' })).toBe('/images/feat-1.jpg');
    expect(resolveProjectImage({ type: 'SI', image: '/images/x.jpg' })).toBe('/images/x.jpg');
  });
});
