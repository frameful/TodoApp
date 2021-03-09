module.exports = {
  purge: [],
  darkMode: false, // or 'media' or 'class'
  theme: {
    fontFamily: {
      sans: "Roboto",
    },
    extend: {
      outline: {
        blue: "2px solid #0000ff",
      },
      backgroundImage: (theme) => ({
        image: "url('./bg.png')",
      }),
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
