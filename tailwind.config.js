import defaultTheme from "tailwindcss/defaultTheme";
import forms from "@tailwindcss/forms";

/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./vendor/laravel/framework/src/Illuminate/Pagination/resources/views/*.blade.php",
        "./storage/framework/views/*.php",
        "./resources/views/**/*.blade.php",
        "./resources/js/**/*.jsx",
    ],

    theme: {
        extend: {
            fontFamily: {
                sans: ["Rubik", ...defaultTheme.fontFamily.sans],
            },
            fontSize: {
                h1: "clamp(2.25rem, 5.5vw, 3.25rem)",
                h2: "clamp(2rem, 5vw, 2.75rem)",
                h3: "clamp(1.75rem, 4.5vw, 2.25rem)",
                h4: "clamp(1.5rem, 3.8vw, 2rem)",
                h5: "clamp(1.25rem, 3vw, 1.625rem)",
                h6: "clamp(1.125rem, 2.5vw, 1.375rem)",

                xs: "clamp(0.75rem, 1.2vw, 0.875rem)",
                sm: "clamp(0.875rem, 1.5vw, 1rem)",
                md: "clamp(1rem, 1.8vw, 1.125rem)",
                lg: "clamp(1.125rem, 2vw, 1.375rem)",
                xl: "clamp(1.25rem, 2.4vw, 1.5rem)",
                "2xl": "clamp(1.5rem, 3vw, 1.875rem)",
                "3xl": "clamp(1.875rem, 3.8vw, 2.25rem)",
            },
            spacing: {
                xs: "clamp(0.25rem, 0.5vw, 0.5rem)",
                sm: "clamp(0.5rem, 1vw, 0.8rem)",
                md: "clamp(1rem, 2vw, 1.5rem)",
                lg: "clamp(1.5rem, 3vw, 2rem)",
                xl: "clamp(2rem, 4vw, 3rem)",
                "2xl": "clamp(3rem, 6vw, 4rem)",
                "3xl": "clamp(4rem, 8vw, 6rem)",
            },
            gap: {
                xs: "clamp(0.25rem, 0.5vw, 0.5rem)",
                sm: "clamp(0.5rem, 1vw, 0.8rem)",
                md: "clamp(1rem, 2vw, 1.5rem)",
                lg: "clamp(1.5rem, 3vw, 2rem)",
                xl: "clamp(2rem, 4vw, 3rem)",
                "2xl": "clamp(3rem, 6vw, 4rem)",
                "3xl": "clamp(4rem, 8vw, 6rem)",
            },
        },
    },

    plugins: [forms],
};
