/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        paper: '#F7FAFB',
        ink: '#0F1D2A',
        teal: {
          50: '#EAF4F5',
          100: '#D2E9EB',
          400: '#12879A',
          600: '#0E6E7F',
          800: '#0A4A57',
          900: '#073540',
        },
        amber: {
          100: '#FDECD2',
          400: '#F5A623',
          600: '#DB8C0F',
        },
        coral: {
          100: '#F8DAD2',
          400: '#DB6A4C',
          600: '#B3502F',
        },
        moss: {
          100: '#DCEEE0',
          400: '#3E9A5B',
          600: '#2C7A44',
        },
      },
      fontFamily: {
        sans: ['"Inter"', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        mono: ['"IBM Plex Mono"', 'ui-monospace', 'monospace'],
      },
      maxWidth: {
        prose: '68ch',
      },
    },
  },
  plugins: [],
}
