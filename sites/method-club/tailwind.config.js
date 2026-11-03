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
        bg: "#0E0E0E",
        bgSoft: "#11131A",
        "text-primary": "#FFFFFF",
        "text-secondary": "rgba(255, 255, 255, 0.78)",
        "text-muted": "rgba(178, 202, 221, 0.7)",
        "accent-blue": "#B2CADD",

        gold: {
          1: "#D6A65C",
          2: "#F0D4A5",
          3: "#FFF2D8",
          4: "#F3BE72",
        },

        card: {
          bg: "rgba(255, 255, 255, 0.06)",
          border: "rgba(255, 255, 255, 0.14)",
        },
      },
      fontFamily: {
        heading: ['"Steelfish"', '"Times New Roman"', "Times", "Georgia", "serif"],
        sans: ["var(--font-manrope)", "system-ui", "sans-serif"],
      },
      fontSize: {
        h1: ["180px", { lineHeight: "0.88", fontWeight: "700" }],
        h2: ["48px", { lineHeight: "1.08", fontWeight: "700" }],
        h3: ["24px", { lineHeight: "1.25", fontWeight: "700" }],
        price: ["28px", { lineHeight: "1.1", fontWeight: "700" }],
        body: ["16px", { lineHeight: "1.5", fontWeight: "400" }],
        small: ["14px", { lineHeight: "1.4", fontWeight: "400" }],
      },
      borderRadius: {
        card: "24px",
        pill: "999px",
      },
      boxShadow: {
        card: "0 24px 80px rgba(0, 0, 0, 0.35)",
        "soft-glow": "0 0 60px rgba(240, 212, 165, 0.22)",
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
