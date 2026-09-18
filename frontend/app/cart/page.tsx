import type { Metadata } from 'next';

import CartPage from '@/b-pages/cartPage/cartPage';
import { getAbsoluteUrl } from '@/d-shared/seo/siteConfig';

export const metadata: Metadata = {
    title: 'Корзина',
    description: 'Выбранные ритуальные товары и принадлежности.',
    alternates: {
        canonical: getAbsoluteUrl('/cart'),
    },
    robots: {
        index: false,
        follow: false,
        nocache: true,
    },
};

const Page = () => <CartPage />;

export default Page;
