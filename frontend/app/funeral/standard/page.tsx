import type { Metadata } from 'next';

import FuneralStandardPage from '@/b-pages/funeralStandardPage/funeralStandardPage';
import {
    createPageJsonLdString,
    createPageMetadata,
    SITE_ROUTES,
} from '@/d-shared/seo/siteConfig';

const route = SITE_ROUTES.funeralStandardService;
const pageJsonLd = createPageJsonLdString(route);

export const metadata: Metadata = createPageMetadata(route);

const Page = () => (
    <>
        <script
            dangerouslySetInnerHTML={{ __html: pageJsonLd }}
            type={'application/ld+json'}
        />
        <FuneralStandardPage />
    </>
);

export default Page;
