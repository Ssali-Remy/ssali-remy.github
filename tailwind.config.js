/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        brand: {
          maroon: "#5B1A1A",
          burgundy: "#ed6560",
          sienna: "#8B5A3C",
          beige: "#f3eed9",
          sand: "#e2d9c9",
          cream: "#fff3f0",
          ink: "#2A1A14",
        },
      },
      fontFamily: {
        display: ["'Roboto'", "system-ui", "sans-serif"],
        sans: ["'Roboto'", "system-ui", "sans-serif"],
        sketch: ["'Roboto'", "system-ui", "sans-serif"],
      },
      boxShadow: {
        soft: "0 10px 30px -12px rgba(91,26,26,0.12)",
        ring: "0 0 0 6px rgba(237,101,96,0.12)",
      },
      keyframes: {
        fadeUp: {
          "0%": { opacity: 0, transform: "translateY(16px)" },
          "100%": { opacity: 1, transform: "translateY(0)" },
        },
      },
      animation: {
        fadeUp: "fadeUp 0.7s ease-out both",
      },
    },
  },
  plugins: [],
};
