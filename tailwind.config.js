/** @type {import('tailwindcss').Config} */
export default {
    darkMode: 'class',
    content: [
      "./index.html",
      "./src/**/*.{js,jsx}",
    ],
    theme: {
      extend: {
        colors: {
          // Resk Color Palette
          resk: {
            darkest: "#002028",      // Almost Black - Very Dark Blue-Green
            dark: "#072B33",         // Very Dark Teal/Blue - Primary Dark
            primary: "#19343B",      // Dark Teal - Primary Color
            secondary: "#325055",     // Dark Teal/Gray - Secondary/Accent
            light: "#8F9C9F",        // Light Gray/Blue - Muted Text/Elements
          },
          // Legacy color mappings for backward compatibility
          myprimary: "#19343B",      // Maps to resk.primary
          mysecondary: "#325055",    // Maps to resk.secondary
          mysecondaryfaded: "#32505526", // Faded version of secondary
          mygray: "#325055",         // Maps to resk.secondary
          mytextcolor: "#072B33",    // Maps to resk.dark
          mygraytext: "#8F9C9F",    // Maps to resk.light
          },
          borderRadius: {
            DEFAULT: "10px",
          },
      },
    },
    plugins: [],
  }
  