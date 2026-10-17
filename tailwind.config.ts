import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./data/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Light Theme Color System
        canvas: {
          DEFAULT: "#F8FAFC",
          alt: "#FFFFFF",
          muted: "#F1F5F9",
        },
        surface: {
          DEFAULT: "#FFFFFF",
          hover: "#F8FAFC",
          elevated: "#FFFFFF",
          subtle: "#F1F5F9",
        },
        border: {
          DEFAULT: "#E2E8F0",
          subtle: "#F1F5F9",
          strong: "#CBD5E1",
        },
        muted: {
          DEFAULT: "#64748B",
          light: "#94A3B8",
          dark: "#475569",
        },
        primary: {
          DEFAULT: "#3157D5",
          dark: "#193B8F",
          hover: "#2545B8",
          light: "#EEF4FF",
        },
        accent: {
          DEFAULT: "#3157D5",
          hover: "#193B8F",
          subtle: "#EEF4FF",
          glow: "rgba(49, 87, 213, 0.15)",
        },
        soft: {
          blue: "#EEF4FF",
          indigo: "#F2F3FF",
          slate: "#F8FAFC",
        },
        verified: {
          DEFAULT: "#0F9F6E",
          subtle: "#ECFDF5",
          border: "#A7F3D0",
        },
        warning: {
          DEFAULT: "#D97706",
          subtle: "#FEF3C7",
        },
        foreground: {
          DEFAULT: "#172033",
          muted: "#475569",
          dim: "#64748B",
        },
      },
      fontFamily: {
        serif: ["Calluna", "Newsreader", "Merriweather", "Charter", "Georgia", "serif"],
        sans: ["Inter", "-apple-system", "BlinkMacSystemFont", "'Segoe UI'", "Roboto", "sans-serif"],
        mono: ["'JetBrains Mono'", "SFMono-Regular", "Menlo", "Monaco", "Consolas", "monospace"],
      },
      boxShadow: {
        soft: "0 2px 10px -2px rgba(23, 32, 51, 0.05)",
        card: "0 4px 20px -2px rgba(25, 59, 143, 0.06), 0 2px 6px -1px rgba(23, 32, 51, 0.03)",
        elevated: "0 10px 30px -4px rgba(25, 59, 143, 0.1), 0 4px 10px -2px rgba(23, 32, 51, 0.04)",
      },
    },
  },
  plugins: [],
};

export default config;
