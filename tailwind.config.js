/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        'brand-red': '#C41E3A',
        'brand-red-light': '#E63946',
        'brand-gold': '#D4AF37',
        'brand-gold-light': '#F4E4A6',
        'brand-blue': '#003D66',
        'brand-green': '#1B6E2C',
        'marigold': '#FFA500',
        'celebration-orange': '#FF6B35',
        'deep-purple': '#663399',
        'cream': '#FFF8F0',
        'dark-text': '#1A1A1A',
        'soft-bg': '#FAFAF8',
        'border-divider': '#E8E8E6',
        'dark-surface': '#2D2D2D',
      },
      fontFamily: {
        serif: ['"Playfair Display"', 'Georgia', 'serif'],
        sans: ['Poppins', 'Inter', 'sans-serif'],
      },
      backgroundImage: {
        'gold-gradient': 'linear-gradient(135deg, #D4AF37, #F4E4A6)',
        'red-gradient': 'linear-gradient(135deg, #C41E3A, #E63946)',
        'dark-gradient': 'linear-gradient(135deg, #1A1A1A, #2D2D2D)',
      },
      boxShadow: {
        'gold': '0 0 20px rgba(212, 175, 55, 0.4)',
        'red-glow': '0 0 20px rgba(196, 30, 58, 0.4)',
        'lift': '0 20px 60px rgba(0,0,0,0.2)',
      },
      animation: {
        'float': 'float 3s ease-in-out infinite',
        'shimmer': 'shimmer 2s linear infinite',
        'pulse-glow': 'pulseGlow 2s ease-in-out infinite',
        'spin-slow': 'spin 10s linear infinite',
        'sparkle': 'sparkle 1.5s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-12px)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% center' },
          '100%': { backgroundPosition: '200% center' },
        },
        pulseGlow: {
          '0%, 100%': { boxShadow: '0 0 10px rgba(212,175,55,0.3)' },
          '50%': { boxShadow: '0 0 30px rgba(212,175,55,0.7)' },
        },
        sparkle: {
          '0%, 100%': { opacity: '0.3', transform: 'scale(0.8)' },
          '50%': { opacity: '1', transform: 'scale(1.2)' },
        },
      },
      maxWidth: {
        'container': '1280px',
      },
    },
  },
  plugins: [],
};
