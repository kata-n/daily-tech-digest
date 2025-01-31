/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        background: {
          light: "#f0f4f8",
          dark: "#1a1b1e",
        },
        card: {
          light: "#ffffff",
          dark: "#25262b",
        },
      },
    },
  },
  plugins: [],
};
