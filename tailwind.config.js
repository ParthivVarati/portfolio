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
        // Dark "AI lab" palette
        base: "#08090B",
        base2: "#0E1116",
        panel: "#10141B",
        text: "#E9ECF1",
        muted: "#878D99",
        line: "rgba(255,255,255,0.09)",
        lime: "#C6FF3D",
        cyan: "#2ED6FF",
        violet: "#8B5CF6",
        // legacy aliases (so any stray reference still resolves)
        paper: "#08090B",
        ink: "#E9ECF1",
        inksoft: "#878D99",
        card: "#10141B",
        coral: "#C6FF3D",
        teal: "#2ED6FF",
        primary: "#C6FF3D",
        accent: "#2ED6FF"
      },
      boxShadow: {
        "glow-lime": "0 12px 44px -10px rgba(198,255,61,0.45)",
        "glow-cyan": "0 12px 44px -10px rgba(46,214,255,0.4)",
        card: "0 24px 70px -34px rgba(0,0,0,0.85)",
        lift: "0 30px 80px -30px rgba(0,0,0,0.9)"
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
        },
        pulseglow: {
          "0%, 100%": { opacity: "0.5" },
          "50%": { opacity: "1" }
        }
      },
      animation: {
        floaty: "floaty 7s ease-in-out infinite",
        marquee: "marquee 26s linear infinite",
        blink: "blink 1.05s step-end infinite",
        pulseglow: "pulseglow 3s ease-in-out infinite"
      }
    }
  },
  plugins: []
};
