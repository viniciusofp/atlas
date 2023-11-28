import type { Config } from 'tailwindcss';
const colors = require('tailwindcss/colors');

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}'
  ],
  theme: {
    colors: {
      transparent: 'transparent',
      current: 'currentColor',
      black: colors.black,
      white: colors.white,
      gray: colors.gray,
      emerald: colors.emerald,
      red: colors.red,
      slate: colors.slate,
      teal: {
        '50': '#f4f6f3',
        '100': '#e6e9e2',
        '200': '#cdd4c6',
        '300': '#a9b5a0',
        '400': '#95a38b',
        '500': '#617455',
        '600': '#4a5a41',
        '700': '#3b4834',
        '800': '#303a2b',
        '900': '#283024',
        '950': '#151b13'
      },
      indigo: colors.indigo,
      yellow: colors.yellow
    },
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))'
      }
    }
  },
  plugins: []
};
export default config;
