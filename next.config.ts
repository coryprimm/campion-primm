/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname:
                    'campion-primm.be2a092f6ecd159de88c95b0d2aeda9f.r2.cloudflarestorage.com',
            },
        ],
    },
};

module.exports = nextConfig;
