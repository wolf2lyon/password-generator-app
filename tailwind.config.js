/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {
      screens: {
        'desktop' : '1440px'
      },
      colors:{
        very_dark_grey:"#18171F",
        dark_grey:"#24232C",
        grey:"#817D92",
        almost_white:"#E6E5EA",
        neon_green:"#A4FFAF",
        yellow:"#F8CD65",
        orange:"#FB7C58",
        red:"#F64A4A",
      }
    }
   
  },
  plugins: [],
}

