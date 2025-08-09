/** @type {import('next').NextConfig} */
const nextConfig = {
    images:{
        domains:['utfs.io'],
        remotePatterns:[
            {
                protocol: 'https',
                hostname: 'utfs.io',
                port:''
            }
        ]
    },
    typescript: {
        ignoreBuildErrors: true,
    },
}

module.exports = nextConfig
