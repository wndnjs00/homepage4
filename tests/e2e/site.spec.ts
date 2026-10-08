import { expect, test } from '@playwright/test';

test('메인 → 메뉴로 프로젝트 목록 이동 후 필터링', async ({ page }) => {
  await page.goto('/');
  await expect(page.getByRole('heading', { level: 1 })).toContainText('금융의 미래를');

  await page.goto('/projects');
  await expect(page.getByText('20 PROJECTS')).toBeVisible();
  await page.locator('.fgrp').filter({ hasText: 'Type' }).getByRole('button', { name: /^Solution/ }).click();
  await expect(page.getByText('04 PROJECTS')).toBeVisible();
  await expect(page.locator('.pcard')).toHaveCount(4);
});

test('검색 오버레이에서 프로젝트를 찾아 상세로 이동', async ({ page }) => {
  await page.goto('/');
  // 헤더(주 메뉴)의 검색 버튼. 모바일 메뉴에도 같은 버튼이 있다
  await page.getByRole('navigation', { name: '주 메뉴' }).getByRole('button', { name: 'SEARCH' }).click();
  await page.getByPlaceholder('프로젝트, 뉴스, 사업분야 검색').fill('농협');
  await page.locator('.srch li a').first().click();
  await expect(page).toHaveURL(/\/projects\/1\/?$/);
  await expect(page.getByRole('heading', { level: 1 })).toContainText('농협은행');
});

test('문의 폼 제출 시 시안 안내 문구 표시', async ({ page }) => {
  await page.goto('/contact');
  await page.getByRole('button', { name: /문의 접수/ }).click();
  await expect(page.getByText('시안 화면이므로 실제 전송은 되지 않습니다.')).toBeVisible();
});
