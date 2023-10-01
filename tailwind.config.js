const colors = require('./src/ui/theme/colors');

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        'outfit-black': ['Outfit-Black'],
        'outfit-bold': ['Outfit-Bold'],
        'outfit-extrabold': ['Outfit-ExtraBold'],
        'outfit-extralight': ['Outfit-ExtraLight'],
        'outfit-light': ['Outfit-Light'],
        'outfit-medium': ['Outfit-Medium'],
        'outfit-regular': ['Outfit-Regular'],
        'outfit-semibold': ['Outfit-SemiBold'],
        'outfit-thin': ['Outfit-Thin'],
      },
      colors,
    },
  },
  plugins: [],
};
