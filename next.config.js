const withTM = require('next-transpile-modules')([
    '@fullcalendar/common',
    '@fullcalendar/common',
    '@fullcalendar/daygrid',
    '@fullcalendar/interaction',
    '@fullcalendar/react',
    '@fullcalendar/timegrid',
])
module.exports = withTM({
    poweredByHeader: false,
    eslint: {
        // Warning: This allows production builds to successfully complete even if the project has ESLint errors.
        ignoreDuringBuilds: true,
    },
    images: {
        domains: ['image.shutterstock.com', 'lh3.googleusercontent.com'],
    },
})
