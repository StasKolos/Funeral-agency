import type { MetadataRoute } from 'next';

import { getAbsoluteUrl, SITE_ROUTES } from '@/d-shared/seo/siteConfig';

const LAST_MODIFIED = new Date('2026-06-09');

const sitemap = (): MetadataRoute.Sitemap =>
    Object.values(SITE_ROUTES).map(({ changeFrequency, path, priority }) => ({
        url: getAbsoluteUrl(path),
        lastModified: LAST_MODIFIED,
        changeFrequency,
        priority,
    }));

export default sitemap;
