/** @type {import('tailwindcss').Config} */
export default {
    content: [
      "./index.html",
      "./src/**/*.{js,jsx}",
    ],
    theme: {
      extend: {
        colors: {
          myprimary: "#1A1D4C",
          mysecondary: "#00A896",
          mysecondaryfaded: "#00a89726",
          mygray:"#333333",
          mytextcolor:"#191783",
          mygraytext:"#AFB0B6",
          },
          borderRadius: {
            DEFAULT: "10px",
          },
      },
    },
    plugins: [],
  }
  