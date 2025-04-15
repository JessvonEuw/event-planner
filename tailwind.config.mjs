/** @type {import('tailwindcss').Config} */
const config = {
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,ts,tsx}"],
  darkMode: "class", // Enable dark mode with class
  theme: {
    extend: {
      colors: {
        primary: "var(--color-primary)",
        primaryDark: "var(--color-primary-dark)",
        secondary: "var(--color-secondary)",
        tertiary: "var(--color-tertiary)",
        black: "var(--color-black)",
      },
    },
  },
  plugins: ["@tailwindcss/typography", "@tailwindcss/forms"],
};

export default config;
