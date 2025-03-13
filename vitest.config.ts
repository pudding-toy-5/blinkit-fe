import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';

import path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['./vitest.setup.ts'],
    // browser: {
    //   enabled: true,
    //   provider: 'playwright',
    //   instances: [
    //     {
    //       browser: 'chromium',
    //     },
    //   ],
    // },
    coverage: {
      enabled: true,
      provider: 'v8',
      reporter: ['text', 'html', 'json'],
      reportOnFailure: true,
    },
  },
});
