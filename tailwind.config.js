/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],

  theme: {
    extend: {
      colors: {
        bg: '#050A14',
        surface: '#0D1526',
        card: '#111D35',
        accent: '#6C63FF',
        accentLight: '#8B85FF',
        accentGlow: '#6C63FF33',
        cyan: '#00D4FF',
        gold: '#FFB84C',
        text: '#E2E8F7',
        muted: '#6B7A99',
        border: '#1E2D4A',
      },

      fontFamily: {
        display: ['Space Grotesk', 'sans-serif'],
        body: ['Inter', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },

      animation: {
        float: 'float 6s ease-in-out infinite',
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'spin-slow': 'spin 20s linear infinite',
        gradient: 'gradient 8s ease infinite',
      },

      keyframes: {
        float: {
          '0%, 100%': {
            transform: 'translateY(0px)',
          },
          '50%': {
            transform: 'translateY(-20px)',
          },
        },

        gradient: {
          '0%, 100%': {
            backgroundPosition: '0% 50%',
          },
          '50%': {
            backgroundPosition: '100% 50%',
          },
        },
      },

      backgroundSize: {
        '300%': '300%',
      },
    },
  },

  plugins: [],
}