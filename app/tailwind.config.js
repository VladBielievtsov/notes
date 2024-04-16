/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        lavender: "var(--lavender)",
        yellow: "var(--yellow)",
        orange: "var(--orange)",
        purple: "var(--purple)",
        blue: "var(--blue)",
        khaki: "var(--khaki)",
      },
    },
  },
  plugins: [],
};
