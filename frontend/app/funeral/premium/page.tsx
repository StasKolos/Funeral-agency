import type { Metadata } from 'next';

import FuneralPremiumPage from '@/b-pages/funeralPremiumPage/funeralPremiumPage';
import { createPageMetadata, SITE_ROUTES } from '@/d-shared/seo/siteConfig';

export const metadata: Metadata = createPageMetadata(SITE_ROUTES.funeralPremiumService);

const Page = () => <FuneralPremiumPage />;

export default Page;
