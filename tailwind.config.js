module.exports = {
  mode: 'jit',
  purge: ['./src/**/*.{js,ts,jsx,tsx}', './index.html'],
  darkMode: false, // or 'media' or 'class'
  presets: [require('./developer_dao.tailwind.preset.js')],
  theme: {
    extend: {},
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
