/** @type {import('tailwindcss').Config} */
export default {
    content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
    theme: {
        fontFamily: {
            serif: ["Inter", "sans-serif"],
            sans: ["Kanit", "ui-sans-serif", "system-ui"],
        },
        extend: {
            colors: {
                "primary-transparent": "#6C63FF33",
                "primary-content": "#F7F7F7",
                "primary-content-transparent": "#F7F7F740",
                "primary-darker": "#5850DD",
                "light-gray": "#CDCDCD",
                "theme-accent": "#252525",
            },
        },
    },
    plugins: [require("daisyui")],
    daisyui: {
        themes: [
            {
                light: {
                    ...require("daisyui/src/theming/themes")["light"],
                    primary: "#6C63FF",
                    "base-content": "#252525",
                    "primary-content": "#F7F7F7",
                },
                dark: {
                    ...require("daisyui/src/theming/themes")["dark"],
                    primary: "#6C63FF",
                    "primary-content": "#F7F7F7",
                    "base-content": "#F7F7F7",
                },
            },
        ],
    },
};
