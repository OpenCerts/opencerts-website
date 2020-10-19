module.exports = {
  future: {
    // removeDeprecatedGapUtilities: true,
    // purgeLayersByDefault: true,
  },
  purge: [],
  theme: {
    container: (theme) => ({
      center: true,
      padding: theme("spacing.4"),
    }),
    fontFamily: {
      "source-sans-pro": ["Source Sans Pro", "sans-serif"],
      montserrat: ["Montserrat", "sans-serif"],
    },
    fontSize: {
      sm: ["14px", "20px"],
      base: ["16px", "24px"],
      md: ["20px", "28px"],
      lg: ["24px", "30px"],
      xl: ["32px", "40px"],
    },
    extend: {
      colors: {
        white: {
          default: "#fff",
        },
        neutral: {
          default: "#ccc",
        },
      },
    },
  },
  variants: {},
  plugins: [],
};
