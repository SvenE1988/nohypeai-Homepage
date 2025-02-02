import type { Config } from "tailwindcss";
import { addVariablesForColors } from "./src/lib/addVariablesForColors";

export default {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "#FF0099",
          foreground: "#FFFFFF",
        },
        secondary: {
          DEFAULT: "#6B46C1",
          foreground: "#FFFFFF",
        },
      },
      fontFamily: {
        sans: ["Inter", "sans-serif"],
      },
      backgroundImage: {
        "gradient-dark": "linear-gradient(135deg, rgba(0,0,0,0.97) 0%, rgba(26,31,53,0.97) 50%, rgba(45,31,53,0.97) 100%)",
        "gradient-glow": "radial-gradient(circle at top right, rgba(107, 70, 193, 0.2) 0%, transparent 60%)",
        "accent-glow": "radial-gradient(circle at bottom left, rgba(255, 0, 153, 0.1) 0%, transparent 40%)",
      },
    },
  },
  plugins: [require("tailwindcss-animate"), addVariablesForColors],
} satisfies Config;