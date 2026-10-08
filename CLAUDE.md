# CLAUDE.md
 
## 1. 프로젝트 개요
 
- **프로젝트명**: 미래아이엔텍 홈페이지
- **목적**: 기존 미래아이엔텍 홈페이지 리뉴얼
- **향후 계획**: 관리자 페이지 추가 예정 (`app/(admin)/`). 지금 만드는 구조와 코드는 관리자 기능이 붙을 것을 고려해 작성한다.
- **주요 사용자**: 회사 홈페이지를 방문하는 모든 사람
## 2. 기술 스택
 
| 영역 | 사용 기술 |
|---|---|
| 프레임워크 | Next.js (App Router), TypeScript (strict) |
| 런타임 | Node.js |
| 데이터베이스 | PostgreSQL |
| ORM / 쿼리 | Prisma  |
| 검증 | Zod |
| 스타일 |  Tailwind CSS |
| 인증 | Auth.js |
| 테스트 | Vitest + Testing Library, Playwright |
| 패키지 매니저 | npm  |
 
## 3. 자주 쓰는 명령어 -> npm으로 변경해서 진행
 
```bash
npm dev            # 개발 서버
npm build          # 프로덕션 빌드
npm lint           # ESLint
npm typecheck      # tsc --noEmit
npm test           # 단위 테스트
npm db:migrate     # 마이그레이션 생성/적용 (개발)
npm db:seed        # 시드 데이터
```
 
작업 완료 전 반드시 `lint`, `typecheck`, `test`를 통과시킨다.
 
## 4. 디렉터리 구조 (Frontend / Backend / Database 분리)
 
하나의 Next.js 앱 안에서 **최상위를 역할별로 나눈다.**
`app/`은 Next.js 라우팅 규칙상 필요한 폴더이며, 화면 조립만 담당한다.
 
```
src/
├─ app/                          # [라우팅] URL ↔ 화면 연결만. 로직 금지
│  ├─ (public)/                  # 공개 페이지 (route group)
│  ├─ (admin)/                   # 관리자 페이지
│  ├─ api/                       # Route Handler (웹훅/외부 연동 등 필요한 경우만)
│  ├─ layout.tsx
│  └─ error.tsx, not-found.tsx
│
├─ frontend/                     # [Frontend] 화면·UI·클라이언트 로직
│  ├─ components/
│  │  ├─ ui/                     # 공용 UI (Button, Input 등. 도메인 지식 없음)
│  │  └─ layout/                 # Header, Footer, Sidebar
│  ├─ features/                  # 도메인별 화면 컴포넌트
│  │  └─ inquiry/                # 예: 문의
│  │     ├─ components/          # InquiryForm.tsx 등
│  │     └─ hooks/               # 해당 기능 전용 훅
│  ├─ hooks/                     # 공용 훅
│  ├─ lib/                       # 클라이언트 유틸 (포맷, className 등)
│  └─ styles/                    # 전역 스타일
│
├─ backend/                      # [Backend] 서버 로직 (서버에서만 실행)
│  ├─ modules/                   # 도메인별 모듈
│  │  └─ inquiry/
│  │     ├─ inquiry.action.ts    # Server Actions (입력 검증 → service 호출)
│  │     ├─ inquiry.service.ts   # 비즈니스 로직
│  │     └─ inquiry.repository.ts# DB 접근 (database/ 를 import하는 유일한 계층)
│  ├─ auth/                      # 인증/권한 검사
│  ├─ config/
│  │  └─ env.ts                  # 환경변수 검증 (Zod)
│  └─ lib/                       # 서버 공용 유틸 (errors.ts, logger.ts 등)
│
├─ database/                     # [Database] PostgreSQL 관련 전부
│  ├─ client.ts                  # DB 연결 (싱글턴)
│  ├─ schema/                    # 테이블 정의 (Prisma면 schema.prisma)
│  ├─ migrations/                # 마이그레이션 파일 (자동 생성, 수동 수정 금지)
│  └─ seed.ts                    # 시드 데이터
│
└─ shared/                       # [공통] Frontend·Backend 양쪽에서 쓰는 것
   ├─ schemas/                   # Zod 스키마 (폼 검증 + 서버 검증 공용)
   ├─ types/                     # DTO, 공용 타입
   └─ constants/                 # 공용 상수
```
 
### 의존 규칙 (import 방향)
 
```
app ──→ frontend ──→ shared
  │         │
  │         └──(Server Action 호출만)──→ backend/modules/*/*.action.ts
  └──→ backend ──→ database
           └──→ shared
```
 
| 폴더 | import 가능 | import 금지 |
|---|---|---|
| `app/` | frontend, backend(조회 service·action), shared | database |
| `frontend/` | shared, backend의 `*.action.ts` | backend의 service/repository, database |
| `backend/` | database, shared | frontend, app |
| `database/` | (외부 라이브러리만) | 그 외 전부 |
| `shared/` | (외부 라이브러리만) | 그 외 전부 |
 
### 계층 규칙
 
- 요청 흐름: `app(page)` → `frontend(컴포넌트)` → `backend action` → `service` → `repository` → `database`
- `page.tsx`, `layout.tsx`는 service 호출(조회)과 frontend 컴포넌트 조립만 한다.
- **DB 접근은 `*.repository.ts`에서만** 한다. 그 외 위치에서 `database/` import 금지.
- `service`는 Next.js에 의존하지 않는 순수 로직으로 작성한다 (테스트 용이성).
- 도메인 간 참조는 상대 모듈의 `service` 공개 함수로만 한다. 다른 모듈의 repository 직접 호출 금지.
- `backend/`, `database/`의 모든 파일 상단에 `import "server-only"`를 둔다.
- Frontend·Backend가 같은 데이터 구조를 쓰면 `shared/`에 정의하고 양쪽에서 import한다. 중복 정의 금지.
- 위 규칙은 ESLint `import/no-restricted-paths`(또는 `eslint-plugin-boundaries`)로 강제한다.
## 5. 코딩 컨벤션
 
- TypeScript `strict`. `any` 금지(불가피하면 사유 주석).
- 기본은 **Server Component**. 상호작용이 필요한 경우에만 `"use client"`를 최소 범위로 사용.
- 데이터 변경은 **Server Actions** 우선. 외부 시스템 호출/웹훅/공개 API만 Route Handler 사용.
- 모든 외부 입력(폼, 쿼리스트링, API body)은 **Zod로 검증** 후 사용.
- 경로 alias: `@/` = `src/`.
- 네이밍: 컴포넌트 `PascalCase.tsx`, 그 외 파일 `kebab-case.ts`, 함수/변수 `camelCase`, 상수 `UPPER_SNAKE_CASE`.
- 에러는 `backend/lib/errors.ts`의 공통 에러 타입으로 던지고, 사용자에게는 일반화된 메시지만 노출.
- 주석/커밋 메시지 언어: TODO: (예: 한국어)
## 6. 데이터베이스 규칙 (PostgreSQL)
 
- 스키마 변경은 **반드시 마이그레이션 파일로**. 운영 DB 직접 수정 금지.
- 이미 적용된 마이그레이션 파일은 수정하지 않는다. 새 마이그레이션을 추가한다.
- 테이블/컬럼명: `snake_case`, 테이블은 복수형 (예: `inquiries`).
- 모든 테이블에 `id`, `created_at`, `updated_at` 포함. 시간은 `timestamptz`(UTC) 사용.
- PK 전략: TODO: (예: `uuid` / `bigint identity`)
- 삭제 정책: TODO: (예: 주요 테이블은 `deleted_at` soft delete)
- 여러 테이블을 변경하는 작업은 트랜잭션으로 묶는다.
- Raw SQL은 파라미터 바인딩만 허용. 문자열 결합 쿼리 금지.
- 목록 조회는 페이지네이션 필수, 자주 조회하는 조건 컬럼에는 인덱스 추가.
## 7. 환경변수 / 보안
 
- 환경변수는 `src/backend/config/env.ts`에서 Zod로 검증 후 import해서 사용. `process.env` 직접 접근 금지.
- 클라이언트에 노출되는 값만 `NEXT_PUBLIC_` 접두사 사용.
- `.env*` 파일은 커밋 금지. 새 변수 추가 시 `.env.example`도 함께 갱신.
- 관리자 기능은 Server Action / Route Handler 내부에서 **서버 측 권한 검사** 필수 (미들웨어만 믿지 않는다).
- 비밀번호·토큰·개인정보는 로그에 남기지 않는다.
## 8. 테스트
 
- `backend/modules/*/*.service.ts`의 비즈니스 로직은 단위 테스트 필수.
- 주요 사용자 흐름(예: 문의 접수, 관리자 로그인)은 E2E 테스트.
- 테스트 파일 위치: TODO: (예: 대상 파일 옆 `*.test.ts`)
- 테스트는 운영 DB에 절대 연결하지 않는다.
## 9. Git / 작업 방식
 
- 브랜치: TODO: (예: `main` 보호, `feat/*`, `fix/*`)
- 커밋 메시지: Conventional Commits (`feat:`, `fix:`, `refactor:`, `chore:` …)
- 하나의 변경은 하나의 목적만. 관련 없는 리팩터링을 섞지 않는다.
## 10. Claude 작업 규칙
 
- 큰 변경 전에는 **계획을 먼저 제시**하고 확인 후 진행한다.
- 새 라이브러리 추가 전 이유를 설명하고 승인받는다.
- 기존 구조·패턴을 우선 따르고, 새 패턴을 임의로 도입하지 않는다.
- 마이그레이션, 환경변수, 인증 로직 변경 시 변경 사항을 명시적으로 보고한다.
- 확실하지 않은 요구사항은 추측하지 말고 질문한다.
- 금지: 운영 DB 접속, `.env` 내용 출력, 테스트 삭제/skip으로 통과시키기, `--force` push.

## 11. 참고 문서