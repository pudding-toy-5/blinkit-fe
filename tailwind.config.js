/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      height: {
        // h-js-screen → height: calc(var(--vh) * 100)
        'js-screen': 'calc(var(--vh, 1vh) * 100)',
      },
      maxHeight: {
        // max-h-js-screen → max-height: calc(var(--vh) * 100)
        'js-screen': 'calc(var(--vh, 1vh) * 100)',
      },
    },
  },
  plugins: [],
};
