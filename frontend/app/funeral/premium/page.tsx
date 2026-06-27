import type { Metadata } from 'next';

import FuneralPremiumPage from '@/b-pages/funeralPremiumPage/funeralPremiumPage';
import {
    createPageJsonLdString,
    createPageMetadata,
    SITE_ROUTES,
} from '@/d-shared/seo/siteConfig';

const route = SITE_ROUTES.funeralPremiumService;
const pageJsonLd = createPageJsonLdString(route);

export const metadata: Metadata = createPageMetadata(route);

const Page = () => (
    <>
        <script
            dangerouslySetInnerHTML={{ __html: pageJsonLd }}
            type={'application/ld+json'}
        />
        <FuneralPremiumPage />
    </>
);

export default Page;
