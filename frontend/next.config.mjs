/** @type {import('next').NextConfig} */
const nextConfig = {
    poweredByHeader: false,
    reactStrictMode: true,
    images: {
        formats: ['image/avif', 'image/webp'],
        deviceSizes: [360, 414, 640, 768, 1024, 1280, 1536, 1920],
        imageSizes: [24, 30, 60, 80, 100, 150, 200, 300, 400],
        minimumCacheTTL: 2_592_000,
        qualities: [75],
    },
    sassOptions: {
        includePaths: ['.', './src'],
    },
};

export default nextConfig;
