import 'server-only';

import { prisma } from './client';
import { BUSINESS_LINES } from './data/business-lines';
import { HOME_CLIENT_ROWS } from './data/clients';
import { NEWS } from './data/news';
import { PROJECTS } from './data/projects';
import { TEAMS } from './data/teams';

// 정적 데이터(src/database/data)를 DB 에 넣는다. 실행: npm run db:seed
// 개발 DB 전용. 기존 콘텐츠를 모두 지우고 다시 넣는다
async function main() {
  await prisma.$transaction(async (tx) => {
    await tx.teamProject.deleteMany();
    await tx.team.deleteMany();
    await tx.businessLine.deleteMany();
    await tx.project.deleteMany();
    await tx.news.deleteMany();
    await tx.client.deleteMany();

    await tx.news.createMany({
      data: NEWS.map((n) => ({
        id: n.id,
        tag: n.tag,
        title: n.title,
        body: n.body,
        publishedOn: n.publishedOn,
      })),
    });

    await tx.project.createMany({
      data: PROJECTS.map((p) => ({
        id: p.id,
        title: p.title,
        type: p.type,
        industry: p.industry,
        status: p.status,
        client: p.client,
        year: p.year,
        noticeDate: p.noticeDate,
        period: 'period' in p ? p.period : undefined,
        overview: 'overview' in p ? p.overview : undefined,
        description: 'description' in p ? p.description : undefined,
      })),
    });

    await tx.businessLine.createMany({
      data: BUSINESS_LINES.map((b, i) => ({
        slug: b.slug,
        no: b.no,
        title: b.title,
        enTitle: b.enTitle,
        image: b.image,
        description: b.description,
        points: b.points,
        summary: b.summary,
        sections: b.sections,
        features: 'features' in b ? b.features : undefined,
        clients: 'clients' in b ? b.clients : undefined,
        sortOrder: i,
      })),
    });

    for (const [i, t] of TEAMS.entries()) {
      await tx.team.create({
        data: {
          slug: t.slug,
          title: t.title,
          enTitle: t.enTitle,
          personName: 'personName' in t ? t.personName : undefined,
          image: 'image' in t ? t.image : undefined,
          bio: 'bio' in t ? t.bio : undefined,
          intro: t.intro,
          functions: t.functions,
          capabilities: t.capabilities,
          sortOrder: i,
          relatedProjects: {
            create: t.relatedProjects.map((p, j) => ({
              title: p.title,
              year: p.year,
              period: 'period' in p ? p.period : undefined,
              projectId: PROJECTS.find((x) => x.title === p.title)?.id,
              sortOrder: j,
            })),
          },
        },
      });
    }

    await tx.client.createMany({
      data: HOME_CLIENT_ROWS.flatMap((row, r) => row.map((name, i) => ({ name, homeRow: r + 1, sortOrder: i }))),
    });
  });
}

main()
  .then(() => prisma.$disconnect())
  .catch(async (e: unknown) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
