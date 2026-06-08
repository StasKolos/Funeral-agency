import type { Metadata } from 'next';

import GraveImprovementPage from '@/b-pages/graveImprovementPage/graveImprovementPage';
import { createPageMetadata, SITE_ROUTES } from '@/d-shared/seo/siteConfig';

export const metadata: Metadata = createPageMetadata(SITE_ROUTES.graveImprovementService);

const Page = () => <GraveImprovementPage />;

export default Page;
