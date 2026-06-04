import type { Metadata } from 'next';

import ServicesPage from '@/b-pages/servicesPage/servicesPage';
import { createPageMetadata, SITE_ROUTES } from '@/d-shared/seo/siteConfig';

export const metadata: Metadata = createPageMetadata(SITE_ROUTES.services);

const Page = () => <ServicesPage />;

export default Page;
