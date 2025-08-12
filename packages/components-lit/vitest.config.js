import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    environment: 'jsdom',
    setupFiles: ['./.storybook/vitest.setup.js'],
    globals: true
  }
});
