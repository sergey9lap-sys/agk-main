/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/sections/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    container: {
      center: true,
      padding: {
        DEFAULT: "1.5rem",
        sm: "2rem",
        lg: "3rem",
      },
      screens: {
        "2xl": "1200px",
      },
    },
    extend: {
      colors: {
        bg: "#080808",
        "bg-secondary": "#0E0E0E",
        "bg-accent": "#151515",
        "text-primary": "#E8E6E1",
        "text-secondary": "#A7A29A",
        "text-muted": "#68645F",

        orange: {
          1: "#F07830",
          2: "#FF9545",
          3: "#FFB060",
          4: "#C75D24",
          5: "#2A1710",
        },

        card: {
          bg: "#151515",
          border: "rgba(255, 255, 255, 0.08)",
        },
      },
      fontFamily: {
        heading: ["Georgia", "Times New Roman", "Times", "serif"],
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
        mono: ["ui-monospace", "SFMono-Regular", "Menlo", "Monaco", "Consolas", "monospace"],
      },
      fontSize: {
        h1: ["clamp(58px, 9vw, 132px)", { lineHeight: "0.9", fontWeight: "800" }],
        h2: ["clamp(34px, 4vw, 58px)", { lineHeight: "1.04", fontWeight: "800" }],
        h3: ["24px", { lineHeight: "1.3", fontWeight: "700" }],
        price: ["28px", { lineHeight: "1.1", fontWeight: "700" }],
        body: ["16px", { lineHeight: "1.6", fontWeight: "400" }],
        small: ["14px", { lineHeight: "1.5", fontWeight: "400" }],
      },
      borderRadius: {
        card: "16px",
        pill: "999px",
      },
      boxShadow: {
        card: "0 18px 48px rgba(0, 0, 0, 0.28)",
        "card-hover": "0 24px 64px rgba(240, 120, 48, 0.16)",
        button: "0 14px 32px rgba(240, 120, 48, 0.24)",
        "button-hover": "0 18px 42px rgba(240, 120, 48, 0.34)",
        "soft-glow": "0 0 42px rgba(240, 120, 48, 0.22)",
      },
      backdropBlur: {
        xs: "2px",
      },
      spacing: {
        safe: "env(safe-area-inset-bottom)",
      },
    },
  },
  plugins: [],
};
