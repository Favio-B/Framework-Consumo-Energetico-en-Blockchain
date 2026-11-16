/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.js"],
  theme: {
    extend: {
      colors: {
        ink: "#020617",
        pow: "#f59e0b",
        pos: "#10b981",
        pbft: "#38bdf8",
      },
      fontFamily: {
        sans: ["Inter", "ui-sans-serif", "system-ui", "Segoe UI", "Roboto", "sans-serif"],
        mono: ["JetBrains Mono", "ui-monospace", "SFMono-Regular", "Consolas", "monospace"],
      },
    },
  },
  plugins: [],
};
