import { URL } from 'node:url';

const IS_DEVELOPMENT = process.env.NODE_ENV === 'development';
const DEFAULT_BACKEND_URL = 'http://127.0.0.1:3001';
const BACKEND_URL = process.env.BACKEND_URL ?? (IS_DEVELOPMENT ? DEFAULT_BACKEND_URL : undefined);
const PRODUCT_IMAGES_PUBLIC_URL =
    process.env.PRODUCT_IMAGES_PUBLIC_URL ?? process.env.S3_PUBLIC_BASE_URL;

if (!BACKEND_URL) {
    throw new Error('BACKEND_URL is required for production frontend build/start');
}

if (!PRODUCT_IMAGES_PUBLIC_URL && !IS_DEVELOPMENT) {
    throw new Error(
        'PRODUCT_IMAGES_PUBLIC_URL or S3_PUBLIC_BASE_URL is required for production frontend build/start',
    );
}

const createRemotePattern = (baseUrl) => {
    const url = new URL(baseUrl);
    const pathname = url.pathname.replace(/\/$/, '');

    return {
        protocol: url.protocol.replace(':', ''),
        hostname: url.hostname,
        port: url.port,
        pathname: `${pathname}/**`,
    };
};

const localProductImageRemotePatterns = [
    {
        protocol: 'http',
        hostname: '127.0.0.1',
        port: '9000',
        pathname: '/funeral-agency/**',
    },
    {
        protocol: 'http',
        hostname: 'localhost',
        port: '9000',
        pathname: '/funeral-agency/**',
    },
];

const productImageRemotePatterns = [
    ...(IS_DEVELOPMENT ? localProductImageRemotePatterns : []),
    ...(PRODUCT_IMAGES_PUBLIC_URL ? [createRemotePattern(PRODUCT_IMAGES_PUBLIC_URL)] : []),
];

/** @type {import('next').NextConfig} */
const nextConfig = {
    poweredByHeader: false,
    reactStrictMode: true,
    images: {
        formats: ['image/avif', 'image/webp'],
        deviceSizes: [360, 414, 640, 768, 1024, 1280, 1536, 1920],
        imageSizes: [24, 30, 60, 80, 100, 150, 200, 300, 400],
        minimumCacheTTL: 2_592_000,
        dangerouslyAllowLocalIP: IS_DEVELOPMENT,
        qualities: [75],
        remotePatterns: productImageRemotePatterns,
    },
    async rewrites() {
        return [
            {
                source: '/api/backend/:path*',
                destination: `${BACKEND_URL}/:path*`,
            },
        ];
    },
    sassOptions: {
        includePaths: ['.', './src'],
    },
};

export default nextConfig;
