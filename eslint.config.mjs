import nextVitals from 'eslint-config-next/core-web-vitals';
import nextTs from 'eslint-config-next/typescript';
import { defineConfig, globalIgnores } from 'eslint/config';

// CLAUDE.md 4장 의존 규칙: 폴더 간 import 방향 강제
const zone = (target, from, message) => ({ target, from, message });

export default defineConfig([
  ...nextVitals,
  ...nextTs,
  globalIgnores(['.next/**', 'out/**', 'node_modules/**', 'next-env.d.ts', 'playwright-report/**', 'test-results/**']),
  {
    rules: {
      '@typescript-eslint/no-explicit-any': 'error',
      'import/no-restricted-paths': [
        'error',
        {
          zones: [
            zone('./src/app', './src/database', 'app 은 database 를 직접 import 할 수 없습니다.'),
            zone('./src/frontend', './src/database', 'frontend 는 database 를 import 할 수 없습니다.'),
            {
              target: './src/frontend',
              from: './src/backend',
              except: ['./modules/**/*.action.ts'],
              message: 'frontend 는 backend 의 *.action.ts 만 import 할 수 있습니다.',
            },
            zone('./src/backend', ['./src/frontend', './src/app'], 'backend 는 frontend·app 을 import 할 수 없습니다.'),
            zone('./src/database', ['./src/app', './src/frontend', './src/backend', './src/shared'], 'database 는 외부 라이브러리만 import 할 수 있습니다.'),
            zone('./src/shared', ['./src/app', './src/frontend', './src/backend', './src/database'], 'shared 는 외부 라이브러리만 import 할 수 있습니다.'),
          ],
        },
      ],
      // DB 접근은 *.repository.ts 에서만
      'no-restricted-imports': 'off',
    },
  },
  {
    files: ['src/backend/**/*.ts'],
    ignores: ['src/backend/**/*.repository.ts'],
    rules: {
      'no-restricted-imports': ['error', { patterns: [{ group: ['@/database/*'], message: 'DB 접근은 *.repository.ts 에서만 합니다.' }] }],
    },
  },
]);
