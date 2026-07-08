import type { MetadataRoute } from 'next';

import { getCategories } from '@/d-shared/api/categories';
import { getProductCategoryPath } from '@/d-shared/products/productRoutes';
import { getAbsoluteUrl, SITE_ROUTES } from '@/d-shared/seo/siteConfig';

const LAST_MODIFIED = new Date('2026-07-09');

const getProductCategorySitemapItems = async (): Promise<MetadataRoute.Sitemap> => {
    try {
        const categories = await getCategories();

        return categories.map((category) => ({
            url: getAbsoluteUrl(getProductCategoryPath(category.code)),
            lastModified: LAST_MODIFIED,
            changeFrequency: 'weekly' as const,
            priority: 0.7,
        }));
    } catch {
        return [];
    }
};

const sitemap = async (): Promise<MetadataRoute.Sitemap> => [
    ...Object.values(SITE_ROUTES).map(({ changeFrequency, path, priority }) => ({
        url: getAbsoluteUrl(path),
        lastModified: LAST_MODIFIED,
        changeFrequency,
        priority,
    })),
    ...(await getProductCategorySitemapItems()),
];

export default sitemap;
