import { type Page, type Locator, expect } from '@playwright/test';

export class LoginPage {
  readonly page: Page;
  readonly emailInput: Locator;
  readonly passwordInput: Locator;
  readonly submitButton: Locator;
  readonly navMenu: Locator;
  readonly loginError: Locator;

  constructor(page: Page) {
    this.page = page;
    this.emailInput = page.locator('[data-test="email"]');
    this.passwordInput = page.locator('[data-test="password"]');
    this.submitButton = page.locator('[data-test="login-submit"]');
    this.navMenu = page.locator('[data-test="nav-menu"]');
    this.loginError = page.locator('[data-test="login-error"]');
  }

  async goto() {
    await this.page.goto('/auth/login');
  }

  async login(email: string, password: string) {
    await expect(this.emailInput).toBeVisible();
    await this.emailInput.fill(email);
    await this.passwordInput.fill(password);

    const loginResponsePromise = this.page.waitForResponse(
      (res) => res.url().includes('/users/login')
    );

    await this.submitButton.click();
    await loginResponsePromise;
  }

  async expectLoggedInUser(firstName: string, lastName: string) {
    await expect(this.navMenu).toBeVisible();
    await expect(this.navMenu).toContainText(`${firstName} ${lastName}`);
  }

  async expectLoginError() {
    await expect(this.loginError).toBeVisible();
    await expect(this.loginError).toHaveText('Invalid email or password');
    await expect(this.page).toHaveURL('/auth/login');
  }
}