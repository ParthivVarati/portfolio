/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter", "ui-sans-serif", "system-ui", "sans-serif"],
        body: ["Inter", "ui-sans-serif", "system-ui", "sans-serif"],
        mono: ["'JetBrains Mono'", "ui-monospace", "monospace"]
      },
      colors: {
        // Dark CRT "terminal" palette (result.dev, dark)
        white: "#060907", // page background (dark)
        paper: "#0D120F", // elevated surface
        ink: "#E8EEE8", // primary text (light)
        sub: "#8A958A", // muted text
        line: "rgba(150,180,150,0.14)",
        green: "#4ADE80",
        greendk: "#2BBA63",
        greentint: "rgba(74,222,128,0.12)",
        // legacy aliases
        primary: "#4ADE80",
        accent: "#4ADE80",
        bg: "#060907",
        card: "#0D120F"
      },
      letterSpacing: {
        tightest: "-0.045em"
      },
      boxShadow: {
        glow: "0 0 28px rgba(74,222,128,0.22)"
      },
      keyframes: {
        marquee: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" }
        },
        blink: {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0" }
        }
      },
      animation: {
        marquee: "marquee 28s linear infinite",
        blink: "blink 1.05s step-end infinite"
      }
    }
  },
  plugins: []
};
