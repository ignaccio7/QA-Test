import { type Page, type Locator, expect } from '@playwright/test';

export class CheckoutCartPage {
  readonly page: Page;
  readonly cartTotal: Locator;

  constructor(page: Page) {
    this.page = page;
    this.cartTotal = page.locator('[data-test="cart-total"]');
  }

  async validateCartItem(productName: string, expectedQuantity: number, expectedUnitPrice: number) {
    // Localizar la fila <tr> específica de ese producto
    const row = this.page.locator('tbody tr').filter({
      has: this.page.locator('[data-test="product-title"]', { hasText: productName }),
    });

    await expect(row).toBeVisible();

    const quantityInput = row.locator('[data-test="product-quantity"]');
    const unitPriceSpan = row.locator('[data-test="product-price"]');
    const linePriceSpan = row.locator('[data-test="line-price"]');

    const expectedLineTotal = (expectedUnitPrice * expectedQuantity).toFixed(2);

    await expect(quantityInput).toHaveValue(String(expectedQuantity));
    await expect(unitPriceSpan).toHaveText(`$${expectedUnitPrice.toFixed(2)}`);
    await expect(linePriceSpan).toHaveText(`$${expectedLineTotal}`);
  }

  async validateCartTotal(expectedTotalAmount: number) {
    await expect(this.cartTotal).toHaveText(`$${expectedTotalAmount.toFixed(2)}`);
  }
}