module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      transitionProperty: {
        'height': 'height'
      }
    },
  },
  variants: {
    extend: {
      animation: ['hover', 'group-hover'],
      translate: ['focus-within', 'group-hover'],
      display: ['group-hover'],
      rotate: ['group-hover'],
      borderColor: ['checked'],
      backgroundColor: ['checked']
    },
  },
  plugins: [],
}
