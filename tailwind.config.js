const colors = require("tailwindcss/colors");
/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ["./src/**/*.{html,js,ts,jsx,tsx}"],
    theme: {
        extend: {
            fontFamily: {
                sans: ['"FiraCode Nerd Font"'],
                serif: ['"FiraCode Nerd Font"'],
                mono: ['"FiraCode Nerd Font"'],
            },
            colors: {
                red: {
                    950: "#cc241d",
                },
                green: {
                    950: "#98971a",
                },
                yellow: {
                    950: "#d79921",
                },
                blue: {
                    950: "#458588",
                },
                purple: {
                    950: "#b16286",
                },
                aqua: {
                    950: "#689d6a",
                },
            },
            fontSize: {
                xs: ".75rem",
                sm: ".875rem",
                base: "1rem",
                lg: "1.125rem",
                xl: "1.25rem",
                "2xl": "1.5rem",
                "3xl": "1.875rem",
                "4xl": "2.25rem",
                "5xl": "3rem",
                "6xl": "4rem",
                "7xl": "5rem",
            },
        },
    },
    plugins: [],
};
