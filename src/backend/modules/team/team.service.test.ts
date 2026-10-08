import { describe, expect, it } from 'vitest';

import { getTeamDetail, getTeamProject, listTeamOnlyProjectParams } from './team.service';

describe('team.service', () => {
  it('Related Projects: 프로젝트 목록에 있으면 프로젝트 상세로 연결', async () => {
    const detail = await getTeamDetail('ito');
    expect(detail?.relatedProjects[0].href).toMatch(/^\/projects\/\d+$/);
  });

  it('Related Projects: 프로젝트 목록에 없으면 팀 전용 상세로 연결', async () => {
    const detail = await getTeamDetail('ceo');
    const teamOnly = detail?.relatedProjects.find((p) => p.title === '한국투자저축은행 인프라 유지보수');
    expect(teamOnly?.href).toBe('/team/ceo/projects/2');
  });

  it('팀 전용 프로젝트 경로 목록에는 프로젝트 목록에 없는 항목만 포함', async () => {
    const params = await listTeamOnlyProjectParams();
    expect(params).toContainEqual({ slug: 'ceo', index: 2 });
    expect(params).toContainEqual({ slug: 'infra', index: 1 });
    expect(params.every((p) => p.slug === 'ceo' || p.slug === 'infra')).toBe(true);
  });

  it('없는 팀·프로젝트는 null', async () => {
    expect(await getTeamDetail('unknown')).toBeNull();
    expect(await getTeamProject('ito', 999)).toBeNull();
  });
});
