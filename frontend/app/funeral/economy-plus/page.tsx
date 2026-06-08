import type { Metadata } from 'next';

import FuneralEconomyPlusPage from '@/b-pages/funeralEconomyPlusPage/funeralEconomyPlusPage';
import { createPageMetadata, SITE_ROUTES } from '@/d-shared/seo/siteConfig';

export const metadata: Metadata = createPageMetadata(SITE_ROUTES.funeralEconomyPlusService);

const Page = () => <FuneralEconomyPlusPage />;

export default Page;
