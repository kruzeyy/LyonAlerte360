export default {
    content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
    theme: {
        extend: {
            colors: {
                'alert-red': '#E53E3E',
                'alert-orange': '#ED8936',
                'alert-yellow': '#ECC94B',
            },
            animation: {
                'ping-slow': 'ping-slow 2s cubic-bezier(0, 0, 0.2, 1) infinite',
            },
            boxShadow: {
                'alert': '0 0 15px rgba(229, 62, 62, 0.5)',
            },
        },
    },
    plugins: [],
};