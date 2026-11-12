import { test, expect } from '@playwright/test';
import { RegisterPage } from '../pages/RegisterPage';
import { generateTestUser } from '../utils/users';

test('Escenario 1: Registro de usuario nuevo', async ({ page }) => {
  const registerPage = new RegisterPage(page);
  const newUser = generateTestUser();

  await registerPage.goto();
  await registerPage.registerUser(newUser);

  // 3. Validar que el registro fue exitoso (redirección a login)
  // await expect(page).toHaveURL('https://practicesoftwaretesting.com/auth/login');

  // Url que no existe para probar los screens y la traza al fallar la prueba
  await expect(page).toHaveURL('https://practicesoftwaretesting.com/auth/algoaquiquenoexiste');
});