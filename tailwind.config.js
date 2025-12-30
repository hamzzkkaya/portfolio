/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./src/**/*.{js,ts,jsx,tsx}",
        "./public/data/**/*.{json,md}",
    ],
    theme: {
        extend: {},
    },
    plugins: [
        require('@tailwindcss/typography'),
    ],
}
