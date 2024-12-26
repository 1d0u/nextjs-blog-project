/** @type {import('tailwindcss').Config} */
import typography from '@tailwindcss/typography'

export default {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        dark: {
          950: '#00152E',
          900: '#001A3A',
          800: '#001F47',
          700: '#002454',
          600: '#002961',
          500: '#002E6E',
          400: '#00347B',
          300: '#003988',
          200: '#003E95',
          100: '#0043A2',
          50: '#0048AF',
        },
        text: {
          light: '#FFFFFF',
          primary: '#F0F0F0',
          secondary: '#CCCCCC',
          muted: '#999999',
        },
        accent: {
          500: '#FF204E',
          400: '#FF3D66',
          300: '#FF5A7E',
        },
        card: {
          dark: '#001E43',
          hover: '#002857',
        }
      },
      typography: {
        dark: {
          css: {
            color: '#F0F0F0',
            a: {
              color: '#FF204E',
              '&:hover': {
                color: '#FF3D66',
              },
            },
            h1: {
              color: '#FF204E',
            },
            h2: {
              color: '#FF204E',
            },
            h3: {
              color: '#FF204E',
            },
            h4: {
              color: '#FF204E',
            },
            strong: {
              color: '#FFFFFF',
            },
            code: {
              color: '#FFFFFF',
            },
            blockquote: {
              color: '#CCCCCC',
              borderLeftColor: '#002454',
            },
          },
        },
      },
    },
  },
  plugins: [typography],
} 