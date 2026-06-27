import type { Metadata } from 'next';

import CremationPage from '@/b-pages/cremationPage/cremationPage';
import {
    createPageJsonLdString,
    createPageMetadata,
    SITE_ROUTES,
} from '@/d-shared/seo/siteConfig';

const route = SITE_ROUTES.cremationService;
const pageJsonLd = createPageJsonLdString(route);

export const metadata: Metadata = createPageMetadata(route);

const Page = () => (
    <>
        <script
            dangerouslySetInnerHTML={{ __html: pageJsonLd }}
            type={'application/ld+json'}
        />
        <CremationPage />
    </>
);

export default Page;
