module.exports = {
  content: [
    './src/**/*.{js,jsx,ts,tsx,html}', // adjust to your project
  ],
  theme: {
    extend: {},
  },
  plugins: [
    require('tailwind-scrollbar'),
  ],
  plugins: [
  require('tailwind-scrollbar')({ nocompatible: true }), // enables `scrollbar-thin`
],
    variants: {
        scrollbar: ['rounded'],
    },
    theme: {
        extend: {
        colors: {
            'custom-blue': '#1DA1F2',
            'custom-green': '#17BF63',
            'custom-red': '#E0245E',
        },
        },
    },
}
