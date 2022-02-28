const plugin = require('tailwindcss/plugin')
const { transformLastClasses } = require('tailwindcss/lib/util/pluginUtils')
const TOKEN_FONT_SIZE_BASE = 16
const toRem = (size) => `${size / TOKEN_FONT_SIZE_BASE}rem`

// S: super
// M: mega
// U: ultra
// H: hyper
// Super < Mega < Ultra < Hyper

module.exports = {
  theme: {
    extend: {
      width: {
        75: toRem(300),
      },
      maxWidth: {
        75: toRem(300),
        138.5: toRem(554),
      },
      minHeight: {
        30: toRem(120),
        75: toRem(300),
        158: toRem(632),
      },
      animation: {
        flipendo: 'flipendo 750ms ease-in-out alternate infinite',
      },
      keyframes: {
        flipendo: {
          from: {
            transform: 'rotateY(0deg)',
          },
          to: {
            transform: 'rotateY(180deg)',
          },
        },
      },
    },
    screens: {
      us: toRem(375),
      ms: toRem(480),
      ss: toRem(576),
      sm: toRem(768),
      md: toRem(976),
      lg: toRem(1024),
      sl: toRem(1200),
      ml: toRem(1366),
      ul: toRem(1444),
    },
    colors: {
      transparent: 'transparent',
      neutral: {
        100: '#ffffff',
        900: '#000000',
      },
      teal: {
        100: '#60E5D5',
        200: '#0e584f',
      },
      pink: {
        100: '#FC7AFF',
      },
      yellow: {
        100: '#F9FFDF',
        200: '#ffd43d',
        500: '#c9ad40',
        800: '#55491b',
      },
    },
    fontSize: {
      px: `${TOKEN_FONT_SIZE_BASE}px`,
      hs: toRem(9), // hyper
      ss: toRem(12), // super small
      sm: toRem(14), // small
      base: toRem(TOKEN_FONT_SIZE_BASE),
      md: toRem(21.33), // medium
      lg: toRem(28.43), // large
      sl: toRem(37.9), // super large
      hl: toRem(50.52), // hyper large
      ml: toRem(67.34), // mega large
    },
    fontFamily: {
      sans: ['"Poppins", sans-serif'],
      mono: ['"Fira Mono", monospace'],
      barcode: ['"Barcode", monospace'],
    },
    borderRadius: {
      none: 0,
      sm: toRem(4),
      md: toRem(6),
      lg: toRem(9),
      sl: toRem(10),
      full: '100%',
    },
    borderWidth: {
      none: 0,
      ss: toRem(1),
      sm: toRem(2),
      md: toRem(3),
    },
    fontWeight: {
      400: 400,
      500: 500,
      600: 600,
      700: 700,
      800: 800,
      900: 900,
    },
    letterSpacing: {
      md: '0.06em',
      lg: '0.12em',
    },
    boxShadow: {
      'yellow-800': '0.3125rem 0.375rem 0 rgba(255, 212, 61, 0.25)',
      'yellow-900': '0.3125rem 0.375rem 0 rgba(255, 212, 61, 0.5)',
    },
    textFillColor: (theme) => theme('borderColor'),
    textStrokeColor: (theme) => theme('borderColor'),
    textStrokeWidth: (theme) => theme('borderWidth'),
    paintOrder: {
      fsm: { paintOrder: 'fill stroke markers' },
      fms: { paintOrder: 'fill markers stroke' },
      sfm: { paintOrder: 'stroke fill markers' },
      smf: { paintOrder: 'stroke markers fill' },
      mfs: { paintOrder: 'markers fill stroke' },
      msf: { paintOrder: 'markers stroke fill' },
    },
  },
  variants: {
    // all the following default to ['responsive']
    textFillColor: ['responsive', ''],
    textStrokeColor: ['responsive'],
    textStrokeWidth: ['responsive'],
    paintOrder: ['responsive'],
  },

  plugins: [
    require('tailwindcss-logical'),
    require('tailwindcss-text-fill-stroke')(), // no options to configure
    plugin(function ({ addVariant, config, postcss }) {
      addVariant(
        'portrait',
        transformLastClasses(
          (className) => {
            return `portrait${config('separator')}${className}`
          },
          {
            wrap: () =>
              postcss.atRule({
                name: 'media',
                params: '(orientation: portrait)',
              }),
          },
        ),
      )
      addVariant(
        'landscape',
        transformLastClasses(
          (className) => {
            return `landscape${config('separator')}${className}`
          },
          {
            wrap: () =>
              postcss.atRule({
                name: 'media',
                params: '(orientation: landscape)',
              }),
          },
        ),
      )
    }),
  ],
}
