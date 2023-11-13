const colors = require('tailwindcss/colors')

/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{html,js,svelte,ts}', './node_modules/flowbite-svelte/**/*.{html,js,svelte,ts}'],
  theme: {
    extend: {
      colors: {
        transparent: 'transparent',
        current: 'currentColor',
        black: colors.black,
        white: colors.white,
        gray: colors.slate,
        green: colors.emerald,
        purple: colors.violet,
        yellow: colors.amber,
        pink: colors.fuchsia,
        primary: {
          50: '#FFF5F2',
          100: '#FFF1EE',
          200: '#FFE4DE',
          300: '#FFD5CC',
          400: '#FFBCAD',
          500: '#FE795D',
          600: '#EF562F',
          700: '#EB4F27',
          800: '#CC4522',
          900: '#A5371B'
        },
        app: {
          DEFAULT: "#64748B",
          darkest: '#0F172A',
          dark: '#334155',
          light: '#E2E8F0',
          lightest: '#F1F5F9',
        },
      }
    },
  },
  plugins: [
      require('flowbite/plugin'),
    require('@tailwindcss/typography'),
  ],
  darkMode: 'class',
  safelist: [
    'text-2xl',
    'text-3xl',
    {
      pattern: /grid-cols-.+/,
      variants: ['md'],
    },
    {
      pattern: /(bg-|dark:bg-).+/
    },
  ],
}

