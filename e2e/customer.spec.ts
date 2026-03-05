import { test, expect } from '@playwright/test';

test.describe('기본 페이지 접근', () => {
  test('루트 페이지가 관리자 로그인으로 리다이렉트된다', async ({ page }) => {
    await page.goto('/');
    await expect(page).toHaveURL('/admin/login');
  });

  test('관리자 로그인 페이지가 정상적으로 로드된다', async ({ page }) => {
    await page.goto('/admin/login');
    
    await expect(page.locator('h1')).toContainText('관리자 로그인');
    await expect(page.locator('[data-testid="admin-login-username-input"]')).toBeVisible();
    await expect(page.locator('[data-testid="admin-login-password-input"]')).toBeVisible();
    await expect(page.locator('[data-testid="admin-login-submit-button"]')).toBeVisible();
  });
});
