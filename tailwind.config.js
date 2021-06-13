const colors = require("tailwindcss/colors");

module.exports = {
  purge: ["./src/**/*.html", "./src/index.html", "./src/**/*.js"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {},
    fontFamily: {
      sans: "'Exo 2', sans-serif",
      body: "'Exo 2', sans-serif",
      heading: "'Work Sans', sans-serif",
    },
    backgroundColor: {
      ...colors,
      'html': '#ee6535',
      'css': '#0c6aa7',
      'javascript': '#fcdc00',
      'typescript': '#007acc',
      'react': '#61dafb',
      'lua': '#2c2d72',
    },
    textColor: {
      ...colors,
      'html': '#ee6535',
      'css': '#0c6aa7',
      'javascript': '#fcdc00',
      'typescript': '#007acc',
      'react': '#61dafb',
      'lua': '#2c2d72',
      'a11y': '#3b4bbf',
      'figma': '#f04e27',
      'npm': '#ca3739',
      'node': '#6a9f65',
    }
  },
  variants: {
    extend: {},
  },
  plugins: [require('daisyui')],
};
