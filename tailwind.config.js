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
          950: '#0A0A0A',
          900: '#121212',
          800: '#1A1A1A',
          700: '#222222',
          600: '#2A2A2A',
          500: '#323232',
          400: '#3A3A3A',
          300: '#424242',
          200: '#4A4A4A',
          100: '#525252',
          50: '#5A5A5A',
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
          dark: '#1A1A1A',
          hover: '#222222',
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
              borderLeftColor: '#2A2A2A',
            },
          },
        },
      },
    },
  },
  plugins: [typography],
} 