import { type Page, type Locator, expect } from '@playwright/test';
import { type TestUser } from '../utils/users';

export class RegisterPage {
  readonly page: Page;
  readonly firstNameInput: Locator;
  readonly lastNameInput: Locator;
  readonly dobInput: Locator;
  readonly countrySelect: Locator;
  readonly postalCodeInput: Locator;
  readonly houseNumberInput: Locator;
  readonly streetInput: Locator;
  readonly cityInput: Locator;
  readonly stateInput: Locator;
  readonly phoneInput: Locator;
  readonly emailInput: Locator;
  readonly passwordInput: Locator;
  readonly submitButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.firstNameInput = page.locator('[data-test="first-name"]');
    this.lastNameInput = page.locator('[data-test="last-name"]');
    this.dobInput = page.locator('[data-test="dob"]');
    this.countrySelect = page.locator('[data-test="country"]');
    this.postalCodeInput = page.locator('[data-test="postal_code"]');
    this.houseNumberInput = page.locator('[data-test="house_number"]');
    this.streetInput = page.locator('[data-test="street"]');
    this.cityInput = page.locator('[data-test="city"]');
    this.stateInput = page.locator('[data-test="state"]');
    this.phoneInput = page.locator('[data-test="phone"]');
    this.emailInput = page.locator('[data-test="email"]');
    this.passwordInput = page.locator('[data-test="password"]');
    this.submitButton = page.locator('[data-test="register-submit"]');
  }

  async goto() {
    await this.page.goto('/auth/register');
  }

  async registerUser(user: TestUser) {
    await this.firstNameInput.fill(user.firstName);
    await this.lastNameInput.fill(user.lastName);
    await this.dobInput.fill(user.dob);

    // 1. Seleccionar país, llenar código postal "0000" y house_number "45"
    await this.countrySelect.selectOption(user.country);
    await this.postalCodeInput.fill(user.postalCode);

    // Esperamos la petición GET /postcode-lookup al llenar house_number y hacer blur/tab
    const lookupPromise = this.page.waitForResponse(
      (res) => res.url().includes('/postcode-lookup') && res.status() === 200
    );
    await this.houseNumberInput.fill(user.houseNumber);
    await this.houseNumberInput.blur(); // Dispara el evento en Angular si requiere perder foco
    await lookupPromise;

    // 2. Validar con Web-First Assertions que Street, City y State se autocompletaron
    await expect(this.streetInput).not.toHaveValue('');
    await expect(this.cityInput).not.toHaveValue('');
    await expect(this.stateInput).not.toHaveValue('');

    // 3. Completar el resto del formulario
    await this.phoneInput.fill(user.phone);
    await this.emailInput.fill(user.email);
    await this.passwordInput.fill(user.password);

    // 4. Enviar registro
    await this.submitButton.click();
  }
}