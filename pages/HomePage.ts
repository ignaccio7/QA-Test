import { type Page, type Locator, expect } from '@playwright/test';

export class HomePage {
  readonly page: Page;
  readonly searchInput: Locator;
  readonly searchSubmit: Locator;
  readonly searchTermCaption: Locator;

  constructor(page: Page) {
    this.page = page;
    this.searchInput = page.locator('[data-test="search-query"]');
    this.searchSubmit = page.locator('[data-test="search-submit"]');
    this.searchTermCaption = page.locator('[data-test="search-term"]');
  }

  async goto() {
    await this.page.goto('/');
    // Esperar a que las tarjetas iniciales hayan cargado antes de usar el buscador
    await expect(this.page.locator('[data-test="product-name"]').first()).toBeVisible();
  }

  async searchAndOpenProduct(productName: string) {
    await this.searchInput.fill(productName);

    const searchResponsePromise = this.page.waitForResponse(
      (res) => res.url().includes('/products/search') && res.status() === 200
    );

    await this.searchSubmit.click();
    await searchResponsePromise;

    await expect(this.searchTermCaption).toHaveText(productName);

    const productCard = this.page
      .locator('[data-test="product-name"]')
      .filter({ hasText: productName })
      .first();

    await expect(productCard).toBeVisible();
    await productCard.click();
  }
}