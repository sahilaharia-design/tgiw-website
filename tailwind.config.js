/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        // Warm ivory / cream base — the paper of a wedding invitation
        'ivory': '#F8F1E4',
        'ivory-deep': '#F0E6D2',
        'parchment': '#EDE3CE',

        // Deep maroon — the wedding core
        'maroon': '#6B1B2E',
        'maroon-deep': '#4A1220',
        'maroon-soft': '#8B2840',

        // Marigold / saffron — festive warmth
        'marigold': '#E8A53A',
        'saffron': '#D97E1F',
        'turmeric': '#C9932B',

        // Henna / earth accents
        'henna': '#7A3A1F',
        'sindoor': '#B8321E',

        // Refined golds (warmer, less yellow)
        'gold': '#B8923E',
        'gold-deep': '#8C6D23',
        'gold-light': '#D9B96A',

        // Ink / text
        'ink': '#2A1B14',
        'ink-soft': '#4A362B',
        'muted': '#8A7560',

        // Compatibility aliases (keep old class names working)
        'brand-red': '#6B1B2E',
        'brand-red-light': '#8B2840',
        'brand-gold': '#B8923E',
        'brand-gold-light': '#D9B96A',
        'brand-blue': '#6B1B2E',
        'brand-green': '#7A3A1F',
        'celebration-orange': '#D97E1F',
        'deep-purple': '#6B1B2E',
        'cream': '#F8F1E4',
        'dark-text': '#2A1B14',
        'soft-bg': '#F8F1E4',
        'border-divider': '#E4D6BC',
        'dark-surface': '#4A1220',
      },
      fontFamily: {
        // 2026 luxury-editorial warm pairing
        serif: ['Fraunces', 'Cormorant Garamond', 'Georgia', 'serif'],
        display: ['Fraunces', 'Georgia', 'serif'],
        sans: ['"Inter Tight"', 'Inter', 'system-ui', 'sans-serif'],
      },
      backgroundImage: {
        'ivory-gradient': 'linear-gradient(180deg, #F8F1E4 0%, #F0E6D2 100%)',
        'maroon-gradient': 'linear-gradient(135deg, #6B1B2E 0%, #4A1220 100%)',
        'gold-gradient': 'linear-gradient(135deg, #B8923E 0%, #D9B96A 50%, #B8923E 100%)',
        'marigold-gradient': 'linear-gradient(135deg, #E8A53A 0%, #D97E1F 100%)',
      },
      boxShadow: {
        'soft': '0 2px 24px rgba(74, 18, 32, 0.06)',
        'lift': '0 24px 60px rgba(74, 18, 32, 0.14)',
        'glow-gold': '0 0 40px rgba(184, 146, 62, 0.25)',
        'glow-maroon': '0 0 40px rgba(107, 27, 46, 0.25)',
        'inset-soft': 'inset 0 1px 0 rgba(255,255,255,0.4)',
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'shimmer': 'shimmer 4s linear infinite',
        'pulse-glow': 'pulseGlow 3s ease-in-out infinite',
        'spin-slow': 'spin 20s linear infinite',
        'fade-up': 'fadeUp 1s ease-out both',
        'breathe': 'breathe 5s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% center' },
          '100%': { backgroundPosition: '200% center' },
        },
        pulseGlow: {
          '0%, 100%': { boxShadow: '0 0 20px rgba(184,146,62,0.2)' },
          '50%': { boxShadow: '0 0 50px rgba(184,146,62,0.45)' },
        },
        fadeUp: {
          '0%': { opacity: '0', transform: 'translateY(24px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        breathe: {
          '0%, 100%': { transform: 'scale(1)', opacity: '0.9' },
          '50%': { transform: 'scale(1.03)', opacity: '1' },
        },
      },
      letterSpacing: {
        'luxe': '0.22em',
        'editorial': '-0.02em',
      },
      maxWidth: {
        'container': '1280px',
        'reading': '62ch',
      },
    },
  },
  plugins: [],
};
