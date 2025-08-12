/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'utfs.io',
            },
            {
                protocol: 'https',
                hostname: 'static.vaope.com',
            },
            {
                protocol: 'https',
                hostname: 'res.cloudinary.com',
            },

            {
                protocol: 'https',
                hostname: 'i.imgur.com',
            },
        ]
    }
}

module.exports = nextConfig