/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        quizlet: {
          dark: '#0a092d',        // Main midnight background
          surface: '#1a1d36',     // Elevated card background
          surfaceHover: '#232746',// Hover card surface
          blue: '#4255ff',        // Quizlet signature electric blue
          blueHover: '#3344dd',
          pill: '#2e3856',        // Dark pill background
          pillHover: '#3b476d',
          border: 'rgba(255, 255, 255, 0.08)',
          borderLight: 'rgba(255, 255, 255, 0.16)',
          text: '#f6f7fb',        // High contrast primary text
          textMuted: '#939bb4',   // Secondary grey text
          textPurple: '#7583ff'   // Interactive link / highlight text
        }
      }
    },
  },
  plugins: [],
}
