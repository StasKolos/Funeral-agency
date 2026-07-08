import type { Metadata } from 'next';

import { notFound, redirect } from 'next/navigation';

import type { ProductCategory } from '@/d-shared/api/types';
import type { SiteRoute } from '@/d-shared/seo/siteConfig';

import ProductCategoryPage from '@/b-pages/productCategoryPage/productCategoryPage';
import { getCategories } from '@/d-shared/api/categories';
import { getProducts } from '@/d-shared/api/products';
import {
    createProductCategoryDescription,
    createProductCategoryTitle,
    findProductCategoryBySlug,
    getCanonicalProductCategorySlug,
    getProductCategoryPath,
    PRODUCTS_PAGE_SIZE,
} from '@/d-shared/products/productRoutes';
import {
    createPageJsonLdString,
    createPageMetadata,
} from '@/d-shared/seo/siteConfig';

type ProductCategoryRouteProps = {
    params: Promise<{
        category: string;
    }>;
};

const createProductCategoryRoute = (category: ProductCategory): SiteRoute => ({
    path: getProductCategoryPath(category.code),
    title: createProductCategoryTitle(category),
    description: createProductCategoryDescription(category),
    changeFrequency: 'weekly',
    priority: 0.7,
});

const getProductCategoryData = async (categorySlug: string) => {
    const canonicalSlug = getCanonicalProductCategorySlug(categorySlug);
    const initialCategories = await getCategories();
    const category = findProductCategoryBySlug(initialCategories, canonicalSlug);

    if (!category) return null;

    const initialProductsResponse = await getProducts({
        category: category.code,
        page: 1,
        size: PRODUCTS_PAGE_SIZE,
    }).catch(() => undefined);

    return {
        category,
        shouldRedirectToCanonicalPath: decodeURIComponent(categorySlug) !== canonicalSlug,
        initialCategories,
        initialProductsResponse,
        initialSelectedCategory: category.code,
    };
};

export const dynamic = 'force-dynamic';

export const generateMetadata = async ({
    params,
}: ProductCategoryRouteProps): Promise<Metadata> => {
    const { category: categorySlug } = await params;
    const pageData = await getProductCategoryData(categorySlug).catch(() => null);

    if (!pageData) return {};

    return createPageMetadata(createProductCategoryRoute(pageData.category));
};

const Page = async ({ params }: ProductCategoryRouteProps) => {
    const { category: categorySlug } = await params;
    const pageData = await getProductCategoryData(categorySlug).catch(() => null);

    if (!pageData) notFound();

    if (pageData.shouldRedirectToCanonicalPath) {
        redirect(getProductCategoryPath(pageData.category.code));
    }

    const route = createProductCategoryRoute(pageData.category);
    const pageJsonLd = createPageJsonLdString(route);

    return (
        <>
            <script
                dangerouslySetInnerHTML={{ __html: pageJsonLd }}
                type={'application/ld+json'}
            />
            <ProductCategoryPage
                category={pageData.category}
                initialCategories={pageData.initialCategories}
                initialProductsResponse={pageData.initialProductsResponse}
                initialSelectedCategory={pageData.initialSelectedCategory}
            />
        </>
    );
};

export default Page;
