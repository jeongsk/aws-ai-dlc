import { Page } from '@playwright/test';

export class AdminLoginPage {
  constructor(private page: Page) {}

  async goto() {
    await this.page.goto('/admin/login');
  }

  async login(username: string, password: string) {
    await this.page.fill('[data-testid="admin-login-username-input"]', username);
    await this.page.fill('[data-testid="admin-login-password-input"]', password);
    await this.page.click('[data-testid="admin-login-submit-button"]');
    await this.page.waitForURL('/admin');
  }
}

export class AdminPage {
  constructor(private page: Page) {}

  async goto() {
    await this.page.goto('/admin');
  }

  async getOrderList() {
    return await this.page.locator('[data-testid="order-item"]').all();
  }

  async updateOrderStatus(orderId: string, status: string) {
    await this.page.click(`[data-order-id="${orderId}"] button:has-text("${status}")`);
  }
}
