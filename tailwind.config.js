/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        display: ["'Bebas Neue'", "cursive"],
        heading: ["'Barlow Condensed'", "sans-serif"],
        body: ["'DM Sans'", "sans-serif"],
      },
      colors: {
        brand: {
          red: "#E8261A",
          dark: "#0A0A0F",
          navy: "#0D1B2A",
          steel: "#1C2B3A",
          silver: "#B8C5D0",
          cream: "#F5F0E8",
        },
      },
      backgroundImage: {
        "hero-gradient":
          "linear-gradient(135deg, #0A0A0F 0%, #0D1B2A 50%, #1a0505 100%)",
        "card-gradient":
          "linear-gradient(145deg, #1C2B3A 0%, #0D1B2A 100%)",
      },
      animation: {
        "fade-up": "fadeUp 0.7s ease forwards",
        "fade-in": "fadeIn 0.5s ease forwards",
        "slide-right": "slideRight 0.6s ease forwards",
        "pulse-slow": "pulse 3s infinite",
      },
      keyframes: {
        fadeUp: {
          "0%": { opacity: 0, transform: "translateY(30px)" },
          "100%": { opacity: 1, transform: "translateY(0)" },
        },
        fadeIn: {
          "0%": { opacity: 0 },
          "100%": { opacity: 1 },
        },
        slideRight: {
          "0%": { opacity: 0, transform: "translateX(-30px)" },
          "100%": { opacity: 1, transform: "translateX(0)" },
        },
      },
    },
  },
  plugins: [],
};
