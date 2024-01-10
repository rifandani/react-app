const forms = require("@tailwindcss/forms");
const typography = require("@tailwindcss/typography");
const daisyui = require("daisyui");
const animate = require("tailwindcss-animate");
const trac = require("tailwindcss-react-aria-components");
const defaultTheme = require("tailwindcss/defaultTheme");
const plugin = require("tailwindcss/plugin");

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class", // default 'media'
  theme: {
    extend: {
      fontFamily: {
        sans: ["Lato", ...defaultTheme.fontFamily.sans],
      },
      lineClamp: {
        7: "7",
        8: "8",
        9: "9",
        10: "10",
      },
      keyframes: {
        "progressbar-indeterminate": {
          from: { transform: "translate(0)" },
          to: { transform: "translate(175%)" },
        },
      },
      animation: {
        "progressbar-indeterminate":
          "progressbar-indeterminate 1.5s ease-in-out infinite",
      },
    },
  },
  plugins: [
    typography,
    forms,
    daisyui,
    animate,
    trac({ prefix: "rac" }),
    plugin(({ matchUtilities }) => {
      matchUtilities({
        vg: (value) => ({
          // eslint-disable-next-line @typescript-eslint/no-unsafe-call
          [`@apply ${value.replaceAll(",", " ")}`]: {},
        }),
      });
    }),
  ],
  daisyui: {
    logs: false,
    themes: [
      "light",
      "dark",
      "cupcake",
      "bumblebee",
      "emerald",
      "corporate",
      "synthwave",
      "retro",
      "cyberpunk",
      "valentine",
      "halloween",
      "garden",
      "forest",
      "aqua",
      "lofi",
      "pastel",
      "fantasy",
      "wireframe",
      "black",
      "luxury",
      "dracula",
      "cmyk",
      "autumn",
      "business",
      "acid",
      "lemonade",
      "night",
      "coffee",
      "winter",
      "dim",
      "nord",
      "sunset",
    ],
  },
};
