const DEFAULT_CLIENT_API_BASE_URL = '/api/backend';
const DEFAULT_DEVELOPMENT_BACKEND_URL = 'http://127.0.0.1:3001';
const IS_DEVELOPMENT = process.env.NODE_ENV === 'development';

const normalizeApiBaseUrl = (url: string) => url.replace(/\/$/, '');

export const getApiBaseUrl = () => {
    if (typeof window !== 'undefined') {
        return normalizeApiBaseUrl(process.env.NEXT_PUBLIC_API_URL ?? DEFAULT_CLIENT_API_BASE_URL);
    }

    const serverApiUrl =
        process.env.BACKEND_URL ??
        (IS_DEVELOPMENT ? DEFAULT_DEVELOPMENT_BACKEND_URL : process.env.NEXT_PUBLIC_API_URL);

    if (!serverApiUrl || serverApiUrl.startsWith('/')) {
        throw new Error(
            'BACKEND_URL or absolute NEXT_PUBLIC_API_URL is required for server API calls',
        );
    }

    return normalizeApiBaseUrl(serverApiUrl);
};
