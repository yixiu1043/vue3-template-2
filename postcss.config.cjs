/* eslint-env node */

module.exports = {
  plugins: {
    'postcss-100vh-fix': {},
    tailwindcss: {},
    'postcss-px-to-viewport-8-plugin': {
      selectorBlackList: ['clip-path'],
      exclude: /lucky-draw/,
      viewportWidth: (file) => {
        let num = 390

        if (file.includes('/vant')) {
          num = 390
        }
        return num
      },
      unitPrecision: 2,
    },
  },
}
