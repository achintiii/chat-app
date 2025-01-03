/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}", // Include all React files
    "./public/index.html",       // Include the HTML file
  ],
  theme: {
    extend: {},
  },
  plugins: [require("daisyui")], // Add DaisyUI plugin
  daisyui: {
    themes: ["light", "dark"],   // Enable DaisyUI themes
  },
};
