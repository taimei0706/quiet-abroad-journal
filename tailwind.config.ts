import type { Config } from "tailwindcss";
import typography from "@tailwindcss/typography";

const config: Config = {
  content: ["./app/**/*.{ts,tsx,mdx}", "./components/**/*.{ts,tsx}", "./content/**/*.mdx"],
  theme: {
    extend: {
      colors: {
        paper: "#F7F5F2",
        ink: "#3A3A3A",
        muted: "#777777",
        line: "#EAE7E2",
        soft: "#EEEAE4"
      },
      fontFamily: {
        sans: ["Inter", "Noto Sans JP", "Zen Kaku Gothic New", "system-ui", "sans-serif"]
      },
      maxWidth: {
        reading: "680px"
      },
      transitionTimingFunction: {
        quiet: "cubic-bezier(.2,.7,.2,1)"
      }
    }
  },
  plugins: [typography]
};

export default config;
