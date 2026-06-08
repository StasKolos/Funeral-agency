import type { Metadata } from 'next';

import CremationFreePage from '@/b-pages/cremationFreePage/cremationFreePage';
import { createPageMetadata, SITE_ROUTES } from '@/d-shared/seo/siteConfig';

export const metadata: Metadata = createPageMetadata(SITE_ROUTES.cremationFreeService);

const Page = () => <CremationFreePage />;

export default Page;
