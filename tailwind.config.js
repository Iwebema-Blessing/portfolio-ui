/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        paper: 'rgb(var(--paper) / <alpha-value>)',
        mist: 'rgb(var(--mist) / <alpha-value>)',
        line: 'rgb(var(--line) / <alpha-value>)',
        graphite: 'rgb(var(--graphite) / <alpha-value>)',
        ink: 'rgb(var(--ink) / <alpha-value>)',
      },
      fontFamily: {
        display: ['"Bricolage Grotesque"', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        sans: ['"Public Sans"', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
      fontSize: {
        // A modular scale, roughly 1.25, set once and used everywhere.
        micro: ['0.78rem', { lineHeight: '1.4' }],
        base: ['1rem', { lineHeight: '1.65' }],
        lead: ['1.18rem', { lineHeight: '1.6' }],
        h3: ['clamp(1.35rem, 1.1rem + 1vw, 1.85rem)', { lineHeight: '1.25' }],
        h2: ['clamp(1.9rem, 1.3rem + 2.4vw, 3.1rem)', { lineHeight: '1.08' }],
        h1: ['clamp(2.6rem, 1.4rem + 5vw, 5.6rem)', { lineHeight: '0.97' }],
      },
      borderRadius: { xl2: '1.75rem', bubble: '1.4rem' },
      maxWidth: { reading: '64ch', shell: '78rem' },
      transitionTimingFunction: {
        glide: 'cubic-bezier(0.22, 0.61, 0.36, 1)',
      },
      keyframes: {
        drift: {
          '0%, 100%': { transform: 'translate3d(0,0,0)' },
          '50%': { transform: 'translate3d(0,-9px,0)' },
        },
        marquee: {
          from: { transform: 'translateX(0)' },
          to: { transform: 'translateX(-50%)' },
        },
      },
      animation: {
        drift: 'drift 6s ease-in-out infinite',
        marquee: 'marquee 38s linear infinite',
      },
    },
  },
  plugins: [],
};
