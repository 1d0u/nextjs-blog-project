import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        dark: {
          50: '#f6f6f7',
          100: '#e1e3e6',
          200: '#c2c5cb',
          300: '#9ca1ab',
          400: '#767d8a',
          500: '#5b616e',
          600: '#434752',
          700: '#333840',
          800: '#272b32',
          900: '#1a1d23',
          950: '#14161a',
        },
      },
    },
  },
  plugins: [],
} satisfies Config;
