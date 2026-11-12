import { type Page, type Locator, expect } from '@playwright/test';

export class ProductDetailPage {
  readonly page: Page;
  readonly productName: Locator;
  readonly unitPrice: Locator;
  readonly quantityInput: Locator;
  readonly addToCartButton: Locator;
  readonly navCart: Locator;
  readonly cartQuantityBadge: Locator;

  constructor(page: Page) {
    this.page = page;
    this.productName = page.locator('[data-test="product-name"]');
    this.unitPrice = page.locator('[data-test="unit-price"]');
    this.quantityInput = page.locator('[data-test="quantity"]');
    this.addToCartButton = page.locator('[data-test="add-to-cart"]');
    this.navCart = page.locator('[data-test="nav-cart"]');
    this.cartQuantityBadge = page.locator('[data-test="cart-quantity"]');
  }

  async validateProductAndGetPrice(expectedName: string): Promise<number> {
    await expect(this.productName).toBeVisible();
    await expect(this.productName).toContainText(expectedName);
    await expect(this.unitPrice).toBeVisible();

    const priceText = await this.unitPrice.innerText();
    const price = parseFloat(priceText.trim());
    expect(price).toBeGreaterThan(0);

    return price;
  }

  async addToCart(quantity: number, expectedTotalBadgeCount: number) {
    await this.quantityInput.fill(String(quantity));

    const cartResponsePromise = this.page.waitForResponse(
      (res) => res.url().includes('/carts') && res.status() >= 200 && res.status() < 300
    );

    await this.addToCartButton.click();
    await cartResponsePromise;

    await expect(this.cartQuantityBadge).toHaveText(String(expectedTotalBadgeCount));
  }

  async goToCart() {
    await this.navCart.click();
    await expect(this.page).toHaveURL('/checkout');
  }
}