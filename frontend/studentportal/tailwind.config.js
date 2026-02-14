/** @type {import('tailwindcss').Config} */
export default {
    content: [
      "./index.html",
      "./src/**/*.{js,ts,jsx,tsx}", // Check karein ke ye line maujood hai
    ],
    theme: {
      extend: {
        colors: {
          'uni-green': '#2e7d32',
          'uni-blue': '#1a3e72',
        },
      },
    },
    plugins: [],
  }