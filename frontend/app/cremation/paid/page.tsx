import type { Metadata } from 'next';

import CremationPaidPage from '@/b-pages/cremationPaidPage/cremationPaidPage';
import { createPageMetadata, SITE_ROUTES } from '@/d-shared/seo/siteConfig';

export const metadata: Metadata = createPageMetadata(SITE_ROUTES.cremationPaidService);

const Page = () => <CremationPaidPage />;

export default Page;
