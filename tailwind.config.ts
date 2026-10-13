import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        icse: {
          blue: {
            50: "#eff8ff",
            100: "#dbeafe",
            200: "#bfdbfe",
            300: "#93c5fd",
            400: "#60a5fa",
            500: "#3b82f6",
            600: "#1d6bc0",
            700: "#0e5a9e",
            800: "#09477e",
            900: "#063259",
            DEFAULT: "#0e5a9e",
          },
          green: {
            50: "#f0fdf4",
            100: "#dcfce7",
            200: "#bbf7d0",
            500: "#22c55e",
            600: "#16a34a",
            700: "#15803d",
            DEFAULT: "#16a34a",
          },
          orange: {
            50: "#fff7ed",
            100: "#ffedd5",
            500: "#f97316",
            600: "#ea580c",
            DEFAULT: "#ea580c",
          },
          navy: "#0a2540",
          card: "#ffffff",
          muted: "#f8fafc",
        },
      },
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
      },
    },
  },
  plugins: [],
};
export default config;

