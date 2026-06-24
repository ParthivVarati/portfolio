/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        display: ["'Space Grotesk'", "ui-sans-serif", "system-ui", "sans-serif"],
        body: ["Inter", "ui-sans-serif", "system-ui", "sans-serif"],
        mono: ["'Space Mono'", "ui-monospace", "monospace"]
      },
      colors: {
        // Sakana "paper" palette
        paper: "#F2ECE0",
        paper2: "#EBE2D2",
        card: "#FBF8F1",
        ink: "#1B1A17",
        inksoft: "#5E574C",
        line: "#DCD2C0",
        coral: "#FF4D2E",
        coraldeep: "#E03A1C",
        teal: "#0E8C7F",
        ocean: "#0A1A2A",
        // legacy aliases (kept so any stray reference still resolves)
        primary: "#FF4D2E",
        accent: "#0E8C7F",
        bg: "#F2ECE0"
      },
      boxShadow: {
        card: "0 1px 0 rgba(27,26,23,0.03), 0 18px 40px -28px rgba(27,26,23,0.45)",
        lift: "0 26px 50px -28px rgba(27,26,23,0.5)",
        coral: "0 14px 34px -12px rgba(255,77,46,0.55)",
        inset: "inset 0 0 0 1px rgba(27,26,23,0.08)"
      },
      keyframes: {
        floaty: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-10px)" }
        },
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
        floaty: "floaty 7s ease-in-out infinite",
        marquee: "marquee 26s linear infinite",
        blink: "blink 1.05s step-end infinite"
      }
    }
  },
  plugins: []
};
