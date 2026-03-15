/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Adding that specific Apple/iCloud blue
        'icloud-blue': '#007aff',
      },
      borderRadius: {
        'apple': '2rem',
      }
    },
  },
  plugins: [],
}
