/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        // Neutral color in tailwindcss
        base: {
          50: '#fafafa',
          100: '#f5f5f5',
          200: '#e5e5e5',
          300: '#d4d4d4',
          400: '#a3a3a3',
          500: '#737373',
          600: '#525252',
          700: '#404040',
          800: '#262626',
          900: '#171717',
          950: '#0a0a0a',
        },
        primary: {
          50: '#fdf2f8',
          100: '#fce7f3',
          200: '#fbcfe8',
          300: '#f9a8d4',
          400: '#f472b6',
          500: '#ec4899',
          600: '#db2777',
          700: '#be185d',
          800: '#9d174d',
          900: '#831843',
          950: '#500724',
        },
        secondary: {
          50: '#faf5ff',
          100: '#f3e8ff',
          200: '#e9d5ff',
          300: '#d8b4fe',
          400: '#c084fc',
          500: '#a855f7',
          600: '#9333ea',
          700: '#7e22ce',
          800: '#6b21a8',
          900: '#581c87',
          950: '#3b0764',
        },
        // secondary: {
        //   50: '#fffbeb',
        //   100: '#fef3c7',
        //   200: '#fde68a',
        //   300: '#fcd34d',
        //   400: '#fbbf24',
        //   500: '#f59e0b',
        //   600: '#d97706',
        //   700: '#b45309',
        //   800: '#92400e',
        //   900: '#78350f',
        //   950: '#451a03',
        // },
        // secondary: {
        //   50: '#f0fdf4',
        //   100: '#dcfce7',
        //   200: '#bbf7d0',
        //   300: '#86efac',
        //   400: '#4ade80',
        //   500: '#22c55e',
        //   600: '#16a34a',
        //   700: '#15803d',
        //   800: '#166534',
        //   900: '#14532d',
        //   950: '#0e2819',
        // },
        body: '#F3EFEF', // text color
        background: '#0a0a0a',
      },
      fontFamily: {
        body: ['Parkinsans'],
      },
      borderWidth: {
        1: '1px',
        3: '3px',
      },
      gridTemplateColumns: {
        'app-layout': '1fr minmax(300px, 900px) 1fr',
      },

      gridTemplateRows: {
        'app-layout': 'auto 1fr',
      },
      borderRadius: {
        'base-small': '0.25rem',
        'base-big': '1.5rem',
      },
    },
  },
  plugins: [],
}
