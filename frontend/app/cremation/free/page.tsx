import type { Metadata } from 'next';

import CremationFreePage from '@/b-pages/cremationFreePage/cremationFreePage';
import {
    createPageJsonLdString,
    createPageMetadata,
    SITE_ROUTES,
} from '@/d-shared/seo/siteConfig';

const route = SITE_ROUTES.cremationFreeService;
const pageJsonLd = createPageJsonLdString(route);

export const metadata: Metadata = createPageMetadata(route);

const Page = () => (
    <>
        <script
            dangerouslySetInnerHTML={{ __html: pageJsonLd }}
            type={'application/ld+json'}
        />
        <CremationFreePage />
    </>
);

export default Page;
