import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
      keyframes: {
        flash: {
          "0%, 100%": { backgroundColor: "white" },
          "50%": { backgroundColor: "#f0f9ff" },
        },
      },
      animation: {
        flash: "flash 0.5s ease-in-out",
      },
    },
  },
  plugins: [],
} satisfies Config;
