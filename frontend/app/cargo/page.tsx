import type { Metadata } from 'next';

import CargoPage from '@/b-pages/cargoPage/cargoPage';
import { createPageMetadata, SITE_ROUTES } from '@/d-shared/seo/siteConfig';

export const metadata: Metadata = createPageMetadata(SITE_ROUTES.cargoService);

const Page = () => <CargoPage />;

export default Page;
