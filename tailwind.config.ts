import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    'shared/ui/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#000000',
        secondary: '#FFFFFF',
        success: '#10B981',
        warning: '#F59E0B',
        error: '#EF4444',
        info: '#3B82F6',
        brand: {
          yellow: '#ffca03',
          dark: '#181111',
          'dark-blue': '#2f4b5d',
          gray: '#f6f6f6',
        },
      },
      fontFamily: {
        sans: ['system-ui', '-apple-system', 'sans-serif'],
        heading: ['system-ui', '-apple-system', 'sans-serif'],
        montserrat: ['var(--font-montserrat)', 'Montserrat', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
};

export default config;
