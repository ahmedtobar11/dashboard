/* eslint-disable no-undef */
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        'main': '#9d312e',
        'main-light': '#fff8f6',    
        'text': '#374151',       
        'light-dark': '#9ca3af', 
        'accent': '#10b981',      
      },
    },
  },
  plugins: [require("daisyui")],
  daisyui: {
    themes: ["light"], 
  },
};
