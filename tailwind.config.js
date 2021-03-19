module.exports = {
  purge: [],
  darkMode: false, // or 'media' or 'class'
  theme: {
    maxHeight: {
      "3/4": "75%",
      "2/3": "66%",
      "1/2": "50%",
      "300px": "300px",
    },
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
