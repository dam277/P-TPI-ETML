const colorPalette = require('./src/configs/colorPalette.json');

/** @type {import('tailwindcss').Config} */
module.exports = 
{
  content: ["./src/**/*.{html,js,jsx,ts,tsx}"],
  theme: 
  {
    extend: 
    {
      colors: colorPalette
    },
  },
  plugins: [],
}

