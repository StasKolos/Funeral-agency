import type { Metadata } from 'next';

import ContactsPage from '@/b-pages/contactsPage/contactsPage';
import { createPageMetadata, SITE_ROUTES } from '@/d-shared/seo/siteConfig';

export const metadata: Metadata = createPageMetadata(SITE_ROUTES.contacts);

const Page = () => <ContactsPage />;

export default Page;
