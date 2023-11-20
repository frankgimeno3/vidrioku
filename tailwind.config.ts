/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      switch: {
        container: {
          width: '51px',
          height: '31px',
          position: 'relative',
        },
        checkbox: {
          opacity: '0',
          width: '0',
          height: '0',
          position: 'absolute',
        },
        switchWrapper: {
          width: '100%',
          height: '100%',
          display: 'block',
          backgroundColor: '#e9e9eb',
          borderRadius: '16px',
          cursor: 'pointer',
          transition: 'all 0.2s ease-out',
        },
        slider: {
          width: '27px',
          height: '27px',
          position: 'absolute',
          left: 'calc(50% - 27px/2 - 10px)',
          top: 'calc(50% - 27px/2)',
          borderRadius: '50%',
          background: '#FFFFFF',
          boxShadow: '0px 3px 8px rgba(0, 0, 0, 0.15), 0px 3px 1px rgba(0, 0, 0, 0.06)',
          transition: 'all 0.2s ease-out',
          cursor: 'pointer',
        },
        checked: {
          backgroundColor: '#34C759',
        },
        checkedSlider: {
          left: 'calc(50% - 27px/2 + 10px)',
          top: 'calc(50% - 27px/2)',
        },
      },
    },
  },
  variants: {
    extend: {
      switch: ['checked'],
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
};