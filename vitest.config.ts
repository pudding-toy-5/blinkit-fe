import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
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
