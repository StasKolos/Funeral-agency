import type { Metadata } from 'next';

import AboutPage from '@/b-pages/aboutPage/aboutPage';
import { createPageMetadata, SITE_ROUTES } from '@/d-shared/seo/siteConfig';

export const metadata: Metadata = createPageMetadata(SITE_ROUTES.about);

const Page = () => <AboutPage />;

export default Page;
