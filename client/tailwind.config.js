/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Premium Palette
        primary: {
          DEFAULT: '#2563EB', // Royal Blue - Main actions
          dark: '#1E40AF',    // Darker blue for hover/active
          light: '#60A5FA',   // Lighter blue for gradients
        },
        secondary: {
          DEFAULT: '#7C3AED', // Vivid Purple - Accents/Gradients
          dark: '#5B21B6',
          light: '#A78BFA',
        },
        success: {
          DEFAULT: '#10B981', // Emerald - Subtle highlights/status
          glow: 'rgba(16, 185, 129, 0.5)',
        },
        dark: {
          DEFAULT: '#0F172A', // Slate 900 - Text/Contrast
          lighter: '#1E293B', // Slate 800 - Cards/Sections
          deep: '#020617',    // Slate 950 - Footer/Dark backgrounds
        },
        light: {
          DEFAULT: '#F8FAFC', // Slate 50 - Backgrounds
          paper: '#FFFFFF',   // Pure white - Cards
          muted: '#94A3B8',   // Slate 400 - Muted text
        }
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'], // Premium modern font
        heading: ['Outfit', 'sans-serif'], // Bold headings
      },
      boxShadow: {
        'glow-sm': '0 0 10px rgba(124, 58, 237, 0.2)',
        'glow-md': '0 0 20px rgba(124, 58, 237, 0.3)',
        'glow-lg': '0 0 30px rgba(37, 99, 235, 0.4)',
        'glass': '0 8px 32px 0 rgba(31, 38, 135, 0.37)',
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'fade-in': 'fadeIn 0.8s ease-out forwards',
        'slide-up': 'slideUp 0.8s ease-out forwards',
        'pulse-glow': 'pulseGlow 2s infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(30px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        pulseGlow: {
          '0%, 100%': { boxShadow: '0 0 10px rgba(124, 58, 237, 0.2)' },
          '50%': { boxShadow: '0 0 25px rgba(124, 58, 237, 0.5)' },
        }
      },
    },
  },
  plugins: [],
}
