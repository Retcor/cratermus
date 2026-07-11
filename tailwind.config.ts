import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./content/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Palette derived from logo.jpg — deep black base with crimson accent.
        bg: "#0B0B0C",
        surface: "#141416",
        "surface-2": "#1C1C20",
        accent: "#E11414",
        "accent-hover": "#FF2B2B",
        "accent-dim": "#7A0D0D",
        // Secondary "glitch" accents pulled from the RGB-split in the logo.
        "glitch-blue": "#4CC9F0",
        "glitch-green": "#6EE7B7",
        ink: "#F5F5F5",
        muted: "#9A9A9E",
        line: "#26262B",
      },
      fontFamily: {
        display: ["var(--font-display)", "system-ui", "sans-serif"],
        sans: ["var(--font-body)", "system-ui", "sans-serif"],
      },
      boxShadow: {
        glow: "0 0 40px -8px rgba(225, 20, 20, 0.45)",
        "glow-sm": "0 0 20px -6px rgba(225, 20, 20, 0.4)",
        // Chromatic-aberration glow: red core with blue/green split edges.
        chromatic:
          "0 0 40px -8px rgba(225, 20, 20, 0.5), 10px 0 28px -10px rgba(76, 201, 240, 0.65), -10px 0 28px -10px rgba(110, 231, 183, 0.6)",
      },
      keyframes: {
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(16px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
      animation: {
        "fade-up": "fade-up 0.6s ease-out both",
      },
    },
  },
  plugins: [],
};

export default config;
