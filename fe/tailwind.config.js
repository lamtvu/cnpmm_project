module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      transitionProperty: {
        'height': 'height'
      },
      keyframes: {
        runleft: {
          '0%': { marginLeft: '0%', marginRight: '100%' },
          '50%': { marginLeft: '25%', marginRight: '0%' },
          '100%': { marginLeft: '100%', marginRight: '0%' }
        },
      },
      animation: {
        runleft: 'runleft 3s ease-in-out infinite',
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
