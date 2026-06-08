import type { Metadata } from 'next';

import FuneralStandardPage from '@/b-pages/funeralStandardPage/funeralStandardPage';
import { createPageMetadata, SITE_ROUTES } from '@/d-shared/seo/siteConfig';

export const metadata: Metadata = createPageMetadata(SITE_ROUTES.funeralStandardService);

const Page = () => <FuneralStandardPage />;

export default Page;
