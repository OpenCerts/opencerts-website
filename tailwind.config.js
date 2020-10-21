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
      xxl: ["40px", "48px"],
    },
    cursor: {
      pointer: "pointer",
      grab: "grab",
    },
    extend: {
      keyframes: {
        pulsing: {
          "0%, 100%": { transform: "scale(1)" },
          "50%": { transform: "scale(1.1)" },
        },
      },
      animation: {
        pulsing: "pulsing 3s alternate infinite",
      },
      colors: {
        white: {
          default: "#fff",
        },
        orange: {
          default: "#ff9933",
        },
        blue: {
          100: "#f5f8fb",
          400: "#09c",
          default: "#ccc",
        },
        pink: {
          100: "#fbeae9",
          default: "#e46767",
        },
        green: {
          100: "#f5fbf7",
          default: "#28a745",
        },
      },
    },
  },
  variants: {},
  plugins: [],
};
