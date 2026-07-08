import type { Metadata } from 'next';

import ProductsPage from '@/b-pages/productsPage/productsPage';
import { getCategories } from '@/d-shared/api/categories';
import {
    createPageJsonLdString,
    createPageMetadata,
    SITE_ROUTES,
} from '@/d-shared/seo/siteConfig';

const route = SITE_ROUTES.products;
const pageJsonLd = createPageJsonLdString(route);

export const metadata: Metadata = createPageMetadata(route);

export const dynamic = 'force-dynamic';

const getInitialProductsData = async () => {
    try {
        const initialCategories = await getCategories();

        return {
            initialCategories,
        };
    } catch {
        return {};
    }
};

const Page = async () => {
    const initialProductsData = await getInitialProductsData();

    return (
        <>
            <script
                dangerouslySetInnerHTML={{ __html: pageJsonLd }}
                type={'application/ld+json'}
            />
            <ProductsPage {...initialProductsData} />
        </>
    );
};

export default Page;
