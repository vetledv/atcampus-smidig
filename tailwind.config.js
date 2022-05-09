const plugin = require('tailwindcss/plugin');
module.exports = {
    mode: 'jit',
    content: [
        './pages/**/*.{js,ts,jsx,tsx}',
        './components/**/*.{js,ts,jsx,tsx}'
    ],
    theme: {
        extend: {
            colors: {
                'purple-1': '#7C7FCA',
                'purple-2': '#9699D5',
                'purple-3': '#B0B2DF',
                'purple-4': '#D8D9EF',
                'purple-5': '#F2F2FA',
                'dark-1': '#363636',
                'dark-2': '#545454',
                'dark-3': '#7A7A7A',
                'dark-4': '#A0A0A0',
                'dark-5': '#C6C6C6',
                'dark-6': '#E8E8E8',
                'gradient-left': '#9F83F1',
                'gradient-right': '#7C7FCA',
                'icon-yellow': '#FFD66B',
                'icon-red': '#FFA1A1'
            },
            borderRadius: {
                standard: '7px'
            }
        },
        fontSize: {
            xs: '12px',
            sm: '14px',
            md: '16px',
            lg: '18px',
            xl: '24px',
            '2xl': '36px'
        },
        fontFamily: {
            sans: ['ui-sans', 'system-ui'],
            serif: ['"Be Vietnam"', 'ui-serif', 'Georgia'],
            mono: ['ui-monospace', 'SFMono-Regular'],
            semibold: ['"Be Vietnam SemiBold"'],
            bold: ['"Be Vietnam Bold"'],
            regular: ['"Be Vietnam"'],
            medium: ['"Be Vietnam Medium"'],
            form: ['Helvetica', 'Arial']
        },
        screens: {
            xs: '400px',
            sm: '640px',
            md: '768px',
            lg: '1024px',
            xl: '1280px',
            '2xl': '1536px'
        }
    },
    variants: {
        extend: {}
    },
    plugins: [
        plugin(function ({ addUtilities }) {
            const newUtilities = {
                '.menu-gradient': {
                    background:
                        'linear-gradient(90.25deg, rgba(159, 131, 241, 0.15) 0.13%, rgba(124, 127, 202, 0.15) 72.19%)'
                },
                '.input-shadow': {
                    'box-shadow': '0px 1px 10px rgba(128, 113, 218, 0.3)'
                }
            };
            addUtilities(newUtilities);
        })
    ]
};
