import { test, expect } from '@playwright/test';
import { AdminLoginPage } from './pages';

test.describe('관리자 로그인 워크플로우', () => {
  test('잘못된 비밀번호로 로그인 시도 시 에러 메시지가 표시된다', async ({ page }) => {
    const loginPage = new AdminLoginPage(page);

    await loginPage.goto();
    
    await page.fill('[data-testid="admin-login-username-input"]', 'admin');
    await page.fill('[data-testid="admin-login-password-input"]', 'wrongpassword');
    await page.click('[data-testid="admin-login-submit-button"]');

    await expect(page.locator('[data-testid="admin-login-error"]')).toBeVisible();
  });

  test('올바른 자격증명으로 로그인 후 관리자 페이지로 이동한다', async ({ page }) => {
    const loginPage = new AdminLoginPage(page);

    await loginPage.goto();
    await loginPage.login('admin', 'admin1234');

    await expect(page).toHaveURL('/admin');
  });
});
