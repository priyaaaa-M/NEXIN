/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        midnight: {
          DEFAULT: '#0F172A',
          50: '#1E293B',
          100: '#1A2234',
          200: '#152031',
          300: '#101828',
          400: '#0C1421',
          500: '#0F172A',
          600: '#0A101E',
          700: '#060A14',
          800: '#030509',
          900: '#000000',
        },
        electric: {
          DEFAULT: '#B026FF',
          50: '#E5B8FF',
          100: '#DBA3FF',
          200: '#D07AFF',
          300: '#C552FF',
          400: '#BA29FF',
          500: '#B026FF',
          600: '#9600DB',
          700: '#7700AF',
          800: '#580082',
          900: '#390056',
        },
        sunny: {
          DEFAULT: '#FFE566',
          50: '#FFFAEA',
          100: '#FFF7D6',
          200: '#FFF0AD',
          300: '#FFEA85',
          400: '#FFE566',
          500: '#FFD60A',
          600: '#D6B100',
          700: '#A38700',
          800: '#705D00',
          900: '#3D3200',
        },
        skyblue: {
          DEFAULT: '#7DF9FF',
          50: '#FFFFFF',
          100: '#FFFFFF',
          200: '#E8FDFF',
          300: '#BFFBFF',
          400: '#9BFAFF',
          500: '#7DF9FF',
          600: '#45F7FF',
          700: '#0DF5FF',
          800: '#00D5E3',
          900: '#00A3AE',
        },
      },
      boxShadow: {
        'glow-purple': '0 0 15px rgba(176, 38, 255, 0.5)',
        'glow-yellow': '0 0 15px rgba(255, 229, 102, 0.5)',
        'glow-blue': '0 0 15px rgba(125, 249, 255, 0.5)',
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'glow': 'glow 2s ease-in-out infinite alternate',
        'scrollUp': 'scrollUp 20s linear infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        glow: {
          '0%': { boxShadow: '0 0 5px rgba(176, 38, 255, 0.5)' },
          '100%': { boxShadow: '0 0 20px rgba(176, 38, 255, 0.8)' },
        },
        scrollUp: {
          '0%': { transform: 'translateY(0%)' },
          '100%': { transform: 'translateY(-50%)' },
        }
      },
    },
  },
  plugins: [],
};