/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        brand: {
          // Granite-grey surfaces with carbon-black text/accents. Token
          // names kept for compatibility with existing utility classes.
          maroon: "#26292E",   // primary dark — carbon / graphite (buttons, headings)
          burgundy: "#3B4048",  // primary hover / accent — slate granite
          sienna: "#5A616B",    // secondary accent — mid granite
          beige: "#D7DBDF",     // alternating section — mid-light granite
          sand: "#BFC4CB",      // borders — granite
          cream: "#E4E7EA",     // page background — light granite (clearly grey)
          ink: "#1B1E22",       // main text — carbon black
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
