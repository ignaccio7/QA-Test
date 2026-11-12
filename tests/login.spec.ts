import { test, expect } from '@playwright/test';
import { RegisterPage } from '../pages/RegisterPage';
import { LoginPage } from '../pages/LoginPage';
import { generateTestUser } from '../utils/users';

test.describe('Autenticación de Usuarios', () => {
  test('Escenario 2: Inicio de sesión con usuario recién creado', async ({ page }) => {
    const registerPage = new RegisterPage(page);
    const loginPage = new LoginPage(page);
    const user = generateTestUser();

    // Precondición UI: crear el usuario y esperar redirección a login
    await registerPage.goto();
    await registerPage.registerUser(user);
    await expect(page).toHaveURL('https://practicesoftwaretesting.com/auth/login');

    // 1. Iniciar sesión con el usuario recién creado
    await loginPage.login(user.email, user.password);

    // 2. Validar que la sesión quedó iniciada (nombre en esquina superior derecha)
    await loginPage.expectLoggedInUser(user.firstName, user.lastName);
  });

  test('Escenario 4 (caso negativo): Login inválido', async ({ page }) => {
    const loginPage = new LoginPage(page);

    // 1. Intentar iniciar sesión con credenciales incorrectas
    await loginPage.goto();
    await loginPage.login('usuario.inexistente.9999@gmail.com', 'ClaveIncorrecta123!');

    // 2. Validar mensaje de error y que no accede a su cuenta
    await loginPage.expectLoginError();
    await expect(loginPage.navMenu).toBeHidden();
  });
});
