import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#1B2A4A',
        secondary: '#C9A84C',
        accent: '#6B7FA3',
        background: '#F8F9FB',
        success: '#22C55E',
        error: '#EF4444',
        black: '#000000',
        white: '#FFFFFF',
        cobaltDeep: '#2C3480',
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
    },
  },
  plugins: [],
};

export default config;