import MainPage from '@/b-pages/mainPage/mainPage';
import { createPageJsonLdString, SITE_ROUTES } from '@/d-shared/seo/siteConfig';

const pageJsonLd = createPageJsonLdString(SITE_ROUTES.home);

const Page = () => (
    <>
        <script
            dangerouslySetInnerHTML={{ __html: pageJsonLd }}
            type={'application/ld+json'}
        />
        <MainPage />
    </>
);

export default Page;
