import react from '@vitejs/plugin-react-swc';
import path from 'path';
import { defineConfig } from 'vite';

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
      exclude: [
        'node_modules',
        // test
        'playwright.config.ts',
        'vitest.config.ts',
        // config
        'eslint.config.js',
        'vite.config.ts',
        'tailwind.config.js',
        'src/vite-env.d.ts',
        // routes
        'src/app/routeTree.gen.ts',
        'src/app/main.tsx',
        'src/app/routes/__root.tsx',
        // @shadcn/ui
        'src/components/ui/**',
        // types
        '**/*.d.ts',
        '**/types.ts',
      ],
    },
  },
});
