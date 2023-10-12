// /** @type {import('tailwindcss').Config} */

const { fontFamily } = require("tailwindcss/defaultTheme");

module.exports = {
    purge: ["./pages/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
    theme: {
        screens: {
            sm: "640px",
            md: "768px",
            lg: "1024px",
            xl: "1440px",
            "2xl": "1900px",
            "3xl": "2600px", // Add a custom breakpoint for 2880px
        },
        container: {
            screens: {
                sm: "100%",
                md: "640px",
                lg: "840px",
                xl: "1040px",
                "2xl": "1367px",
                "3xl": "2560px", // Adjust container width for 2880px
            },
        },
        extend: {
            fontFamily: {
                ...fontFamily,
                sans: ["Josefin Sans", "Arial", "sans-serif"],
                success: ["Lobster", "cursive"],
            },
            colors: {
                primaryColor: {
                    DEFAULT: "#fe8d3c",
                    50: "#fff6ed",
                    100: "#ffecd4",
                    200: "#ffd4a9",
                    300: "#ffb572",
                    400: "#fe8d3c",
                    500: "#fd6a12",
                    600: "#ed5009",
                    700: "#c53a09",
                    800: "#9c2e10",
                    900: "#7e2810",
                    950: "#441106",
                },

                secondaryColor: {
                    DEFAULT: "#7da43e",
                    50: "#f5f9ec",
                    100: "#e8f1d6",
                    200: "#d4e5b1",
                    300: "#b7d284",
                    400: "#9bbf5d",
                    500: "#7da43e",
                    600: "#60822e",
                    700: "#4b6427",
                    800: "#3d5024",
                    900: "#354522",
                    950: "#1a250e",
                },
                greenColor: {
                    DEFAULT: "#00a651",
                    50: "#edfff5",
                    100: "#d6ffea",
                    200: "#afffd5",
                    300: "#71ffb6",
                    400: "#2dfb90",
                    500: "#02e570",
                    600: "#00bf59",
                    700: "#00a651",
                    800: "#06753d",
                    900: "#085f34",
                    950: "#00361b",
                },
                darkText: "#12130F",
                darkBG: "#1B1B1C",
                bg: "#FBFBF5",
                redColor: "#FE654F",
                darkRed: "#444140",
            },
        },
    },
    variants: {
        extend: {
            height: ["responsive"],
            width: ["responsive"],
        },
    },
    corePlugins: {
        container: false,
    },
    plugins: [
        function ({ addComponents }) {
            addComponents({
                ".container": {
                    width: "100%",
                    "@screen sm": {
                        maxWidth: "640px",
                    },
                    "@screen md": {
                        maxWidth: "768px",
                    },
                    "@screen lg": {
                        maxWidth: "1024px",
                    },
                    "@screen xl": {
                        maxWidth: "1120px",
                    },
                    "@screen 2xl": {
                        maxWidth: "1480px",
                    },
                },
            });
        },
    ],
};
