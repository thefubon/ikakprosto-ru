/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./components/**/*.{js,vue,ts}",
    "./layouts/**/*.vue",
    "./pages/**/*.vue",
    "./plugins/**/*.{js,ts}",
    "./app.vue",
    "./error.vue",
  ],
  theme: {
    container: {
      center: true,
      padding: {
        DEFAULT: "1.5rem",
      },
    },
    screens: {
      xs: "480px",
      sm: "640px",
      md: "768px",
    },
    extend: {
      fontFamily: {
        'sans': ['SF Pro Text', 'ui-sans-serif', 'system-ui'],
      },
      colors: {
        DEFAULT: '#040405',
        primary: '#FF6B00',
        alert: '#FF3B30',
        muted: '#F5F5F5',
        text: '#05090E',
        tag: '#787880'
      }
    },
  },
  plugins: [],
}

