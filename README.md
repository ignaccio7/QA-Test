# QA Automation Challenge - Practice Software Testing

Proyecto de automatización de pruebas end-to-end (E2E) con **Playwright** y **TypeScript** para el sitio de práctica [Practice Software Testing](https://practicesoftwaretesting.com).

## 📹 Video Explicativo
- **Enlace del video:** 

---

## 🛠️ Requisitos Previos
- **Node.js**: Versión 18 o superior (recomendado v20+).
- **npm** (o **pnpm**).

---

## 🚀 Instalación

1. Clonar el repositorio:
   ```bash
   git clone <URL_DEL_REPOSITORIO>
   cd qa-automation
   ```

2. Instalar dependencias:
   ```bash
   npm install
   # O si utilizas pnpm:
   # pnpm install
   ```

3. Instalar los navegadores de Playwright:
   ```bash
   npx playwright install
   ```

---

## 🧪 Ejecución de Pruebas

### Ejecutar todas las pruebas (Headless)
```bash
npx playwright test
```

### Ejecutar en modo visible (Headed)
```bash
npx playwright test --headed
```

### Ejecutar un escenario específico
```bash
npx playwright test tests/cart.spec.ts --headed
```

### Ejecutar en un navegador específico (Cross-Browser)
```bash
npx playwright test --project=chromium
npx playwright test --project=firefox
```

### Visualizar el reporte HTML y evidencias
```bash
npx playwright show-report
```

---
