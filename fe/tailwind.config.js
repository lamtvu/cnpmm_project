module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {},
  },
  variants: {
    extend: {
      animation: ['hover','group-hover'],
      translate:['focus-within'],
      display:['group-hover']
    },
  },
  plugins: [],
}
