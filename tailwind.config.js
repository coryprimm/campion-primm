/* eslint-env node */
import aspectRatio from '@tailwindcss/aspect-ratio';
/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
        './src/components/**/*.{js,ts,jsx,tsx,mdx}',
        './src/app/**/*.{js,ts,jsx,tsx,mdx}',
        './src/pages/**/*.{html,js}',
        './src/components/**/*.{html,js}',
    ],
    theme: {
        extend: {
            colors: {
                greyback: '#f6f4f5', // works
            },
            fontFamily: {
                // montserrat: ['Montserrat'],
                morganite: ['Morganite', 'sans-serif'],
                libre: ['var(--font-libre-baskerville)', 'Minion Pro', 'serif'],
                minion: ['Minion Pro', 'serif'],
                eaves: ['Mrs Eaves', 'serif'],
                lato: ['Lato'],
                garamond: ['Garamond'],
                montserrat: [
                    'var(--font-montserrat)',
                    'helvetica',
                    'sans-serif',
                ],
                'libre-baskerville': [
                    'var(--font-libre-baskerville)',
                    'Minion Pro',
                    'serif',
                ],
                'mrs-eaves': ['var(--font-mrs-eaves)', 'serif'], // Add Adobe Fonts
            },
            screens: {
                xs: '440px', // This creates a custom screen size for 440px
            },
        },
        plugins: [aspectRatio],
    },
};
