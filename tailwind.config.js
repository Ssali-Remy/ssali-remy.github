/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        brand: {
          // Carbon-black + granite-grey palette. Token names kept for
          // compatibility with existing utility classes across the app.
          maroon: "#22262B",   // primary — carbon / graphite (buttons, headings)
          burgundy: "#3A414A",  // primary hover / accent — slate granite
          sienna: "#5C6470",    // secondary accent — granite
          beige: "#ECEEF1",     // soft section background — light granite
          sand: "#D3D7DC",      // borders — pale granite
          cream: "#F7F8FA",     // page background — near-white granite
          ink: "#191C20",       // main text — carbon black
        },
      },
      fontFamily: {
        display: ["'Roboto'", "system-ui", "sans-serif"],
        sans: ["'Roboto'", "system-ui", "sans-serif"],
        sketch: ["'Roboto'", "system-ui", "sans-serif"],
      },
      boxShadow: {
        soft: "0 10px 30px -12px rgba(25,28,32,0.14)",
        ring: "0 0 0 6px rgba(58,65,74,0.14)",
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
