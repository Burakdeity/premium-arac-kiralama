import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        navy: {
          DEFAULT: "#0A1628",
          50: "#E8ECF2",
          100: "#C5CED9",
          200: "#9EADC0",
          300: "#778CA7",
          400: "#5A7293",
          500: "#3D587F",
          600: "#2A4060",
          700: "#1A2D45",
          800: "#0F1F35",
          900: "#0A1628",
          950: "#060E18",
        },
        gold: {
          DEFAULT: "#C9A227",
          50: "#FBF6E8",
          100: "#F5E9C4",
          200: "#EBD48A",
          300: "#E0BF50",
          400: "#D4AD35",
          500: "#C9A227",
          600: "#A8851F",
          700: "#876819",
          800: "#664D13",
          900: "#45330D",
        },
      },
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
        display: ["var(--font-display)", "Georgia", "serif"],
      },
      backgroundImage: {
        "hero-gradient":
          "linear-gradient(135deg, rgba(10,22,40,0.92) 0%, rgba(10,22,40,0.75) 50%, rgba(10,22,40,0.6) 100%)",
        "gold-gradient":
          "linear-gradient(135deg, #C9A227 0%, #E0BF50 50%, #C9A227 100%)",
      },
      boxShadow: {
        premium: "0 4px 24px rgba(10, 22, 40, 0.12)",
        "premium-lg": "0 8px 40px rgba(10, 22, 40, 0.18)",
        gold: "0 4px 20px rgba(201, 162, 39, 0.3)",
      },
      animation: {
        "fade-in": "fadeIn 0.6s ease-out forwards",
        "slide-up": "slideUp 0.6s ease-out forwards",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        slideUp: {
          "0%": { opacity: "0", transform: "translateY(20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
