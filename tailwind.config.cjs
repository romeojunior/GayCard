module.exports = {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui'],
        serif: ['Playfair Display', 'ui-serif', 'serif'],
      },
      colors: {
        'card-gray': '#bfc4c7',
      }
    },
  },
  plugins: [],
}
