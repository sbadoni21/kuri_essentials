/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors:{
        bgmain:"#d2e6b5",
        bgmain2:"#c1db9b",
        bgmain3:"#b1cf86",
        bgmain4:"#a0c172",
        bgmain5:"#8eb15c",
        primary: '#FDCCE0',
        slate:'#64748B',
        pink: "#C9184A",
        blue: "#02394A",
        cream: "#F8EDEB",
        snowWhite: "#F7FEFD",
        white: "#F4F4F4",
        lightpink: "F8EDEB",
      }
      
    },
  },
  plugins: [],
};
