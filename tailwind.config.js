const spacing = Array.from({ length: 200 }).reduce((acc, item, index) => {
  acc[index * 2] = index * 2 + 'px'
  return acc
}, {})
/** @type {import('tailwindcss').Config} */
export default {
  prefix: 'tw-',
  content: ['./src/**/*.{vue,ts,tsx,js,jsx,html}'],
  theme: {
    borderRadius: spacing,
    spacing,
    fontSize: spacing,
    extend: {
      lineHeight: {
        1: 1,
        1.5: 1.5,
      },
      fontFamily: {
        knockout: 'Knockout',
        HelveticaNeue: 'HelveticaNeue',
      },
      colors: {
        primary: 'var(--bg-primary)', // 主题色
        secondary: 'var(--bg-secondary)', // 主题蓝色
        'font-primary': 'var(--font-primary)',
        'font-primary-dark': 'var(--font-primary-dark)',
        'font-secondary': 'var(--font-secondary)',
        'font-title': 'var(--font-title)',
        'font-title-dark': 'var(--font-title-dark)',
        'font-prompt': 'var(--font-prompt)',
        'font-prompt-dark': 'var(--font-prompt-dark)',
        warning: 'var(--color-warning)',
        danger: 'var(--color-danger)',
        stroke1: 'var(--color-stroke1)',
        'stroke1-dark': 'var(--color-stroke1-dark)',
        stroke2: 'var(--color-stroke2)',
        stroke3: 'var(--color-stroke3)',
        accent1: 'var(--color-accent1)',
        accent2: 'var(--color-accent2)',
        button1: 'var(--color-button1)',
        button2: 'var(--color-button2)',
        yellow1: 'var(--color-yellow1)',
        gradient1: 'var(--color-gradient1)',
        gradient2: 'var(--color-gradient2)',
        gradient3: 'var(--color-gradient3)',
        gradient4: 'var(--color-gradient4)',
        gradient5: 'var(--color-gradient5)',
        gradient6: 'var(--color-gradient6)',
        gradient7: 'var(--color-gradient7)',
        gradient8: 'var(--color-gradient8)',
        gradient9: 'var(--color-gradient9)',
        gradient10: 'var(--color-gradient10)',
        gradient11: 'var(--color-gradient11)',
        gradient12: 'var(--color-gradient12)',
        gradient13: 'var(--color-gradient13)',
        gradient14: 'var(--color-gradient14)',
      },
    },
  },
  plugins: [],
}
