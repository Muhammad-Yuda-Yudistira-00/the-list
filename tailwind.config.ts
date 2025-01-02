import type { Config } from "tailwindcss";
const flowbite = require("flowbite-react/tailwind");

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    flowbite.content(),
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        logoColor: "#c4f649",
        colorPallete: {
          pallete1: "#BAD8B6",
          pallete2: "#E1EACD",
          pallete3: "#F9F6E6",
          pallete4: "#8D77AB",
        }
      },
    },
  },
  plugins: [
    flowbite.plugin(),
  ],
} satisfies Config;
