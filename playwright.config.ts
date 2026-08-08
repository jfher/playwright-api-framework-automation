import { defineConfig } from '@playwright/test';
import { environment } from './src/config/environment';

export default defineConfig({
  testDir: './tests',
  timeout: environment.timeout,
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,

  reporter: [
    ['html'],
    ['allure-playwright']
  ],

  use: {
    baseURL: environment.baseUrl,
    headless: environment.headless,
    trace: 'on-first-retry',
    screenshot: 'only-on-failure'
  }
});