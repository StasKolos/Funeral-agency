import type { Metadata } from 'next';

import FuneralEconomyPage from '@/b-pages/funeralEconomyPage/funeralEconomyPage';
import {
    createPageJsonLdString,
    createPageMetadata,
    SITE_ROUTES,
} from '@/d-shared/seo/siteConfig';

const route = SITE_ROUTES.funeralEconomyService;
const pageJsonLd = createPageJsonLdString(route);

export const metadata: Metadata = createPageMetadata(route);

const Page = () => (
    <>
        <script
            dangerouslySetInnerHTML={{ __html: pageJsonLd }}
            type={'application/ld+json'}
        />
        <FuneralEconomyPage />
    </>
);

export default Page;
