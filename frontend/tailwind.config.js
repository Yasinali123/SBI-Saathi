/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        navy: {
          950: '#020B18',
          900: '#0A1628',
          800: '#0D1F3C',
          700: '#112847',
          600: '#1A3A5C',
          500: '#1E4D7B',
        },
        electric: {
          600: '#0D6EFD',
          500: '#1E90FF',
          400: '#4DA8FF',
          300: '#80C4FF',
        },
        cyan: {
          accent: '#00D4FF',
          glow: '#00BFFF',
          soft: '#7DD3FC',
        },
        glass: {
          white: 'rgba(255,255,255,0.05)',
          border: 'rgba(255,255,255,0.1)',
          hover: 'rgba(255,255,255,0.08)',
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        display: ['Outfit', 'Inter', 'sans-serif'],
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-hero': 'linear-gradient(135deg, #020B18 0%, #0A1628 40%, #0D1F3C 70%, #071220 100%)',
        'gradient-card': 'linear-gradient(135deg, rgba(30,144,255,0.1) 0%, rgba(0,212,255,0.05) 100%)',
        'gradient-electric': 'linear-gradient(135deg, #1E90FF 0%, #00D4FF 100%)',
      },
      boxShadow: {
        'glass': '0 8px 32px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.1)',
        'electric': '0 0 30px rgba(30,144,255,0.3), 0 4px 20px rgba(0,0,0,0.5)',
        'glow': '0 0 60px rgba(0,212,255,0.2)',
        'card': '0 20px 60px rgba(0,0,0,0.5)',
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'glow-pulse': 'glowPulse 3s ease-in-out infinite',
        'slide-up': 'slideUp 0.5s ease-out',
        'fade-in': 'fadeIn 0.6s ease-out',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        glowPulse: {
          '0%, 100%': { boxShadow: '0 0 20px rgba(30,144,255,0.3)' },
          '50%': { boxShadow: '0 0 60px rgba(0,212,255,0.6)' },
        },
        slideUp: {
          from: { transform: 'translateY(20px)', opacity: '0' },
          to: { transform: 'translateY(0)', opacity: '1' },
        },
        fadeIn: {
          from: { opacity: '0' },
          to: { opacity: '1' },
        }
      },
      backdropBlur: {
        'xs': '2px',
      }
    },
  },
  plugins: [],
}
