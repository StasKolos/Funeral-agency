import type { Metadata } from 'next';

import FuneralEconomyPlusPage from '@/b-pages/funeralEconomyPlusPage/funeralEconomyPlusPage';
import {
    createPageJsonLdString,
    createPageMetadata,
    SITE_ROUTES,
} from '@/d-shared/seo/siteConfig';

const route = SITE_ROUTES.funeralEconomyPlusService;
const pageJsonLd = createPageJsonLdString(route);

export const metadata: Metadata = createPageMetadata(route);

const Page = () => (
    <>
        <script
            dangerouslySetInnerHTML={{ __html: pageJsonLd }}
            type={'application/ld+json'}
        />
        <FuneralEconomyPlusPage />
    </>
);

export default Page;
