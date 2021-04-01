module.exports = {
  future: {
    removeDeprecatedGapUtilities: true,
    purgeLayersByDefault: true,
  },
  purge: ["./src/**/*.ts", "./src/**/*.tsx"],
  theme: {
    container: (theme) => ({
      center: true,
      padding: theme("spacing.4"),
    }),
    inset: {
      // eslint-disable-next-line prettier/prettier
      "0": 0,
      "1/2": "50%",
    },
    fontFamily: {
      "source-sans-pro": ["Source Sans Pro", "sans-serif"],
      montserrat: ["Montserrat", "sans-serif"],
    },
    fontSize: {
      xs: ["14px", "20px"],
      sm: ["16px", "24px"],
      base: ["18px", "26px"],
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
        grey: {
          default: "#ccc",
        },
        orange: {
          default: "#ff9933",
        },
        red: {
          default: "#ff5268",
        },
        blue: {
          100: "#f5f8fb",
          300: "#53bcdf",
          default: "#09c",
        },
        navy: {
          200: "#eef2f5",
          300: "#506c85",
          default: "#324353",
        },
        pink: {
          100: "#fbeae9",
          300: "#e87d7d",
          default: "#e46767",
        },
        green: {
          100: "#f5fbf7",
          200: "#d9ead3",
          300: "#46b760",
          400: "#38761d",
          default: "#28a745",
        },
      },
    },
  },
  variants: {},
  plugins: [],
};
