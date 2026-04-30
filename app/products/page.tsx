import type { Metadata } from 'next';

import ProductsPage from '@/b-pages/productsPage/productsPage';
import { createPageMetadata, SITE_ROUTES } from '@/d-shared/seo/siteConfig';

export const metadata: Metadata = createPageMetadata(SITE_ROUTES.products);

const Page = () => <ProductsPage />;

export default Page;
