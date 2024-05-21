module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false,
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#4A90E2',
          dark: '#357ABD',
        },
        secondary: '#D0021B',
        background: '#F5F5F5',
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};