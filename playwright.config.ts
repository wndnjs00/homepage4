import { defineConfig } from '@playwright/test';

// E2E: 개발 서버를 띄워 주요 사용자 흐름을 확인한다
// 브라우저는 설치된 Microsoft Edge 를 사용 (npx playwright install 불필요)
export default defineConfig({
  testDir: './tests/e2e',
  timeout: 60_000,
  use: {
    baseURL: 'http://localhost:3000',
    channel: 'msedge',
  },
  webServer: {
    command: 'npm run dev',
    url: 'http://localhost:3000',
    reuseExistingServer: true,
    timeout: 180_000,
  },
});
