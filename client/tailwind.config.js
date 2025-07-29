/** @type {import('tailwindcss').Config} */
export default {
    content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
    theme: {
        extend: {
            backdropBlur: {
                xs: '2px',
            },
            boxShadow: {
                glass: '0 4px 30px rgba(0, 0, 0, 0.1)',
            },
        },
    },
    plugins: [],

}
