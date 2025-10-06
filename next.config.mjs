/** @type {import('next').NextConfig} */
const nextConfig = {
    eslint: {
        dirs: ['src'],
    },
    sassOptions: {
        includePaths: ['.', './src'],
    },
};

export default nextConfig;
