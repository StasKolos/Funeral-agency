import type { Metadata } from 'next';

import ProductsPage from '@/b-pages/productsPage/productsPage';
import { getCategories } from '@/d-shared/api/categories';
import { getProducts } from '@/d-shared/api/products';
import {
    createPageJsonLdString,
    createPageMetadata,
    SITE_ROUTES,
} from '@/d-shared/seo/siteConfig';

const PRODUCTS_PAGE_SIZE = 10;
const route = SITE_ROUTES.products;
const pageJsonLd = createPageJsonLdString(route);

export const metadata: Metadata = createPageMetadata(route);

export const dynamic = 'force-dynamic';

const getInitialProductsData = async () => {
    try {
        const initialCategories = await getCategories();
        const initialSelectedCategory = initialCategories[0]?.code ?? '';
        const initialProductsResponse = initialSelectedCategory
            ? await getProducts({
                  category: initialSelectedCategory,
                  page: 1,
                  size: PRODUCTS_PAGE_SIZE,
              })
            : undefined;

        return {
            initialCategories,
            initialSelectedCategory,
            ...(initialProductsResponse ? { initialProductsResponse } : {}),
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
