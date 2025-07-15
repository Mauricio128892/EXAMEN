// tailwind.config.js
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primaryBg: '#1a202c',
        secondaryBg: '#2d3748',
        textColor: '#e2e8f0',
        textSecondary: '#a0aec0',
        accentGreen: '#38a169',
        accentGreenHover: '#2f855a',
        redDanger: '#e53e3e',
      },
    },
  },
  plugins: [],
}
