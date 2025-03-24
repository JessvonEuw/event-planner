/** @type {import('tailwindcss').Config} */
const config = {
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,ts,tsx}"],
  darkMode: "class", // Enable dark mode with class
  theme: {
    extend: {
      colors: {
        umber: "var(--color-umber)",
        terracotta: "var(--color-terracotta)",
        sage: "var(--color-sage)",
        purple: "var(--color-purple)",
      },
    },
  },
  plugins: ["@tailwindcss/typography", "@tailwindcss/forms"],
};

export default config;
