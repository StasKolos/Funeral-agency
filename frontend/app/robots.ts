import type { MetadataRoute } from 'next';

import { getAbsoluteUrl, SITE_HOST } from '@/d-shared/seo/siteConfig';

const robots = (): MetadataRoute.Robots => ({
    rules: {
        userAgent: '*',
        allow: '/',
    },
    sitemap: getAbsoluteUrl('/sitemap.xml'),
    host: SITE_HOST,
});

export default robots;
