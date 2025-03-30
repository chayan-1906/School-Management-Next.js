import type {Config} from "tailwindcss";

export default {
    content: [
        './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
        './src/components/**/*.{js,ts,jsx,tsx,mdx}',
        './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    ],
    theme: {
        extend: {
            backgroundImage: {
                'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
                'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
            },
            colors: {
                lamaSky: '#A3F4FD',
                lamaSkyLight: '#CEFAFE',
                lamaPurple: '#DAB2FF',
                lamaPurpleLight: '#F3E8FF',
                lamaYellow: '#FEF085',
                lamaYellowLight: '#FFF9C2',
                lamaRed: '#F92C36',
                lamaRedLight: '#FBA2A3',
            },
        },
    },
    plugins: [],
} satisfies Config;
