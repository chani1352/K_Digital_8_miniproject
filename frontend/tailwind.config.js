/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      width: {
        '128': '32rem',
      },
      fontFamily :{
        'NanumSquareR' : 'NanumSquareR',
        'NanumSquareNeo' : 'NanumSquareNeo',
        'NanumSquareNeoB' : 'NanumSquareNeoB'
      }
    },
  },
  plugins: [],
}

