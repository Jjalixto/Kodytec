/** @type {import('next').NextConfig} */
const nextConfig = {
    async rewrites() {
        return [
            {
                source: '/api/:path*',
                destination: process.env.NEXT_PUBLIC_API_BASE_URL + '/:path*', // Usar la URL de tu API
            },
        ];
    },
};

export default nextConfig;
