import { test } from '@playwright/test';
import { HomePage } from '../pages/HomePage';
import { ProductDetailPage } from '../pages/ProductDetailPage';
import { CheckoutCartPage } from '../pages/CheckoutCartPage';

test('Escenario 3: Agregar productos al carrito y validar cantidades y precios', async ({ page }) => {
  const homePage = new HomePage(page);
  const productDetailPage = new ProductDetailPage(page);
  const checkoutCartPage = new CheckoutCartPage(page);

  let helmetPrice = 0;
  let sawPrice = 0;

  await test.step('1. Buscar el producto "Construction Helmet"', async () => {
    await homePage.goto();
    await homePage.searchAndOpenProduct('Construction Helmet');
  });

  await test.step('2. Abrir el detalle del producto y validar su nombre y precio', async () => {
    helmetPrice = await productDetailPage.validateProductAndGetPrice('Construction Helmet');
  });

  await test.step('3. Agregar un ítem del producto al carrito', async () => {
    await productDetailPage.addToCart(1, 1);
  });

  await test.step('4. Buscar el producto "Circular Saw"', async () => {
    await homePage.goto();
    await homePage.searchAndOpenProduct('Circular Saw');
  });

  await test.step('5. Abrir el detalle del producto y validar su nombre y precio', async () => {
    sawPrice = await productDetailPage.validateProductAndGetPrice('Circular Saw');
  });

  await test.step('6. Agregar dos ítems del producto al carrito', async () => {
    await productDetailPage.addToCart(2, 3);
  });

  await test.step('7. Abrir el carrito y validar productos, cantidades y precios esperados', async () => {
    await productDetailPage.goToCart();

    await checkoutCartPage.validateCartItem('Construction Helmet', 1, helmetPrice);
    await checkoutCartPage.validateCartItem('Circular Saw', 2, sawPrice);

    const expectedCartTotal = helmetPrice * 1 + sawPrice * 2;
    await checkoutCartPage.validateCartTotal(expectedCartTotal);
  });
});