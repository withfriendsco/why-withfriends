module.exports = {
  future: {
    removeDeprecatedGapUtilities: true,
    purgeLayersByDefault: true,
  },
  purge: {
    mode: "all",
    layers: ["base", "utilities"],
    content: [
      "src/**/*.js",
      "src/**/*.jsx",
      "src/**/*.ts",
      "src/**/*.tsx",
      "public/**/*.html",
    ],
  },
  theme: {
    extend: {
      minWidth: {
        "0": "0",
        "1/4": "25%",
        "1/3": "33%",
        "1/2": "50%",
        "3/4": "75%",
        "full": "100%",
      },
      spacing: {
        "1/2": "50%",
        100: "100%",
      },
      flex: {
        288: "0 0 288px",
      },
      gridTemplateColumns: {
        16: "repeat(16, minmax(0, 1fr))",
      },
      colors: {
        salmon: {
          700: "#f37669", // Pressed salmon
          600: "#ff877b", // Main salmon
          200: "#ffa097", // Processing
        },
        wfGray: {
          800: "#333333", // Hover secondary
          700: "#6f6f6f",
          600: "#8c8c8c", // Disabled salmon button
          500: "#a4a6b3",
          400: "#c0c0c0",
          300: "#d2d2d2",
          200: "#e2e2e2",
          100: "#f6f4f4",
        },
      },
      container: {
        center: true,
      },
      fontFamily: {
        sans: ['"Avenir Book WF"', "sans-serif"],
        heavy: ['"Avenir Heavy WF"', "sans-serif"],
      },
      inset: {
        "-2": "-2px",
        2: "2px",
        "03": "0.3rem",
        "-03": "-0.3rem",
        "05": "0.5rem",
        "-05": "-0.5rem",
        "07": "0.7rem",
        "-07": "-0.7rem",
      },
    },
  },
  variants: {
    borderStyle: ["responsive", "focus", "active"],
    backgroundColor: ["responsive", "hover", "focus", "active"],
    boxShadow: ["responsive", "hover", "focus", "active"],
    border: ["responsive", "hover", "focus", "active"],
    borderWidth: ["responsive", "hover", "focus", "active"],
    position: ["responsive", "hover", "active"],
    inset: ["responsive", "hover", "active"],
    translate: ["responsive", "hover", "focus", "active"],
    aspectRatio: ["responsive"],
  },
  plugins: [
    require("@tailwindcss/typography"),
    require("@neojp/tailwindcss-aspect-ratio-utilities"),
  ],
}
