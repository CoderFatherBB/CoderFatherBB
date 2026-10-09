import { defineConfig } from '@playwright/test';
import config from './playwright.config';

export default defineConfig({
  ...config,
  testMatch: /hero-regressions\.spec\.ts/,
  use: { ...config.use, browserName: 'webkit' },
});
