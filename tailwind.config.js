/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./*.html",
    "./assets/js/**/*.js"
  ],
  theme: {
    extend: {
      colors: {
        book: {
          cream: '#FCFBF7',     // Premium paper warm cream background
          sand: '#F4ECE1',      // Cozy warm sand tone for sections/cards
          charcoal: '#1E1D19',  // Warm charcoal for premium readable text
          forest: '#244831',    // Rich forest green for main branding and accents
          terracotta: '#BA5026',// Terracotta rust orange for action CTAs
          gold: '#C49746',      // Warm vintage gold highlights
          muted: '#6E6A62'      // Soft gray-brown for secondary text
        }
      },
      fontFamily: {
        serif: ['Lora', 'Merriweather', 'Georgia', 'serif'],
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif']
      }
    }
  },
  plugins: []
}
