import type { Metadata } from 'next';

import FuneralEconomyPage from '@/b-pages/funeralEconomyPage/funeralEconomyPage';
import { createPageMetadata, SITE_ROUTES } from '@/d-shared/seo/siteConfig';

export const metadata: Metadata = createPageMetadata(SITE_ROUTES.funeralEconomyService);

const Page = () => <FuneralEconomyPage />;

export default Page;
