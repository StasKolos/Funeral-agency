import type { Metadata } from 'next';

import CremationPage from '@/b-pages/cremationPage/cremationPage';
import { createPageMetadata, SITE_ROUTES } from '@/d-shared/seo/siteConfig';

export const metadata: Metadata = createPageMetadata(SITE_ROUTES.cremationService);

const Page = () => <CremationPage />;

export default Page;
