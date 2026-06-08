import type { Metadata } from 'next';

import FuneralPage from '@/b-pages/funeralPage/funeralPage';
import { createPageMetadata, SITE_ROUTES } from '@/d-shared/seo/siteConfig';

export const metadata: Metadata = createPageMetadata(SITE_ROUTES.funeralService);

const Page = () => <FuneralPage />;

export default Page;
