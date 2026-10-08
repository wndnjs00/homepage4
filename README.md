# 미래아이엔텍 홈페이지

Next.js(App Router) + TypeScript + Tailwind CSS. 작업 규칙은 [CLAUDE.md](./CLAUDE.md)를 따른다.

## 실행

```bash
npm install
npm run db:generate  # Prisma Client 생성 (설치 후 1회)
npm run dev          # http://localhost:3000
npm run build        # 정적 내보내기 → out/
npm run lint
npm run typecheck
npm test             # Vitest
npm run test:e2e     # Playwright (설치된 Microsoft Edge 사용)
```

## 배포

`main`에 push하면 GitHub Actions가 lint·typecheck·test 후 정적 빌드(`out/`)를 GitHub Pages에 배포한다.
저장소 하위 경로 배포를 위해 빌드 시 `NEXT_PUBLIC_BASE_PATH=/homepage4`를 지정한다.

## 데이터

현재는 GitHub Pages 정적 배포이므로 공개 페이지가 `src/database/data/*.ts`의 정적 데이터를 읽는다.
각 `*.repository.ts`가 이 데이터를 `shared/schemas/content.ts`의 Zod 스키마로 검증해 반환한다.
관리자 기능(서버 배포) 도입 시 repository만 Prisma 조회로 교체하면 되도록 계층을 나눠 두었다.

- 스키마: `src/database/schema/schema.prisma`
- 시드: `npm run db:seed` (정적 데이터를 DB에 입력, `DATABASE_URL` 필요)

## 경로

| 메뉴 | 경로 |
|---|---|
| 홈 | `/` |
| COMPANY · Mirae I&Tec / Team / News&Notices | `/company`, `/team`, `/team/[slug]`, `/news`, `/news/[id]` |
| BUSINESS · Projects / Business Line | `/projects`, `/projects/[id]`, `/business`, `/business/[slug]` |
| Contact | `/contact` |

## 디자인

- 토큰(색상·폰트·이징·브레이크포인트): `src/frontend/styles/globals.css`의 `@theme`
- 레이아웃·간격: 컴포넌트의 Tailwind 유틸리티 클래스
- 상태·호버·애니메이션이 얽힌 효과(드롭다운, 차오르는 카드, 도형, 마키 등): `globals.css`의 `@layer components`
- 브레이크포인트: `max-tab:`(≤1100px), `max-mob:`(≤760px)
