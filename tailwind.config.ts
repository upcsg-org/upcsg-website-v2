import type { Config } from 'tailwindcss'

const config: Config = {
    content: [
        './pages/**/*.{js,ts,jsx,tsx,mdx}',
        './components/**/*.{js,ts,jsx,tsx,mdx}',
        './app/**/*.{js,ts,jsx,tsx,mdx}',
    ],
    theme: {
        extend: {
            backgroundImage: {
                'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
                'gradient-conic':
                    'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
            },
            fontFamily: {
                vietnam: ['Be Vietnam Pro', 'sans-serif'],
                'press-start': ['Press\\ Start\\ 2P', 'cursive'],
                economica: ['Economica', 'sans-serif']
            },
            colors: {
                'main-dark': '#111120',
                'secondary-dark': '#171A33',
                'primary-light': '#39A2AE',
                'secondary-light': '#2D4486',
                'csg-green': {
                    100: '#41A01E',
                    200: '#348218',
                    300: '#24690B',
                    400: '#096F00',
                    500: '#D0F2C3',
                    600: '#303D31',
                },
                'csg-blue': {
                    100: '#0500FF',
                    200: '#E0E1F6',
                    300: '#666BD3',
                    400: '#262B59',
                    500: '#2A334B',
                    600: '#39407B',
                    700: '#000017',
                    800: '#C6E0FF',
                },
                'csg-pink': {
                    100: '#FF00F5',
                    200: '#FFD4E1',
                    300: '#FF89AC',
                    400: '#D4329D',
                },
                'csg-yellow': {
                    100: '#EDD500',
                    200: '#A0741E',
                    300: '#82841E',
                    400: '#7FA01E',
                    500: '#987033',
                    600: '#5A9045',
                },
                'csg-gray': {
                    100: '#7f7f7f',
                },
                'csg-red': {
                    100: '#A0293F',
                    200: '#780F4E',
                },
                'csg-orange': {
                    100: '#EE6C45',
                    200: '#8F3318',
                },
                'csg-violet': {
                    100: '#7B00C6',
                    200: '#5959B0',
                    300: '#7D66AD'
                }
            },
            screens: {
                'ps': '372px',
                // => @media (min-width: 372px) { ... } 
                'xs': '500px',
                // => @media (min-width: 500px) { ... }
                'ls': '948px',
                // => @media (min-width: 948px) { ... }
                'ms': '648px',
                // => @media (min-width: 648px) { ... }
                '3xl': '2560px',
                // => @media (min-width: 648px) { ... }
            },
        },
    },
    plugins: [],
}
export default config
