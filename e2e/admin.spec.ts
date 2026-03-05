import { test, expect } from '@playwright/test';
import { AdminLoginPage, AdminPage } from './pages';

test.describe('관리자 로그인 및 주문 관리', () => {
  test('관리자가 로그인할 수 있다', async ({ page }) => {
    const loginPage = new AdminLoginPage(page);

    await loginPage.goto();
    await loginPage.login('admin', 'admin1234');

    await expect(page).toHaveURL('/admin');
  });

  test('관리자 페이지에 접근할 수 있다', async ({ page }) => {
    const loginPage = new AdminLoginPage(page);
    const adminPage = new AdminPage(page);

    await loginPage.goto();
    await loginPage.login('admin', 'admin1234');

    await adminPage.goto();
    await expect(page).toHaveURL('/admin');
  });
});
