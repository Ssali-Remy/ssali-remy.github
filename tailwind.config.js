/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        brand: {
          maroon: "#5B1A1A",
          burgundy: "#7A2424",
          sienna: "#8B5A3C",
          beige: "#E8DDD0",
          sand: "#D4C5B0",
          cream: "#FAF7F2",
          ink: "#2A1A14",
        },
      },
      fontFamily: {
        display: ["'Playfair Display'", "Georgia", "serif"],
        sans: ["'Inter'", "system-ui", "sans-serif"],
        sketch: ["'Caveat'", "cursive"],
      },
      boxShadow: {
        soft: "0 10px 30px -12px rgba(91,26,26,0.18)",
        ring: "0 0 0 6px rgba(91,26,26,0.08)",
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
