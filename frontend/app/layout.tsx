import type { Metadata } from 'next';

import { SpeedInsights } from '@vercel/speed-insights/next';
import { Montserrat } from 'next/font/google';
import { PropsWithChildren } from 'react';
import { ToastContainer } from 'react-toastify';

import QueryProvider from '@/a-app/providers/queryProvider';
import ContentLayout from '@/c-widgets/contentLayout/contentLayout';
import {
    createFuneralHomeJsonLd,
    createRootMetadata,
    createWebSiteJsonLd,
    stringifyJsonLd,
} from '@/d-shared/seo/siteConfig';

import './style.scss';

export const metadata: Metadata = createRootMetadata();

const funeralHomeJsonLd = stringifyJsonLd(createFuneralHomeJsonLd());
const webSiteJsonLd = stringifyJsonLd(createWebSiteJsonLd());

const montserrat = Montserrat({
    weight: ['400', '700'],
    subsets: ['cyrillic', 'latin'],
    display: 'swap',
});

const RootLayout = ({ children }: PropsWithChildren) => (
    <html
        data-scroll-behavior={'smooth'}
        lang={'ru'}
    >
        <body className={montserrat.className}>
            <script
                dangerouslySetInnerHTML={{ __html: webSiteJsonLd }}
                type={'application/ld+json'}
            />
            <script
                dangerouslySetInnerHTML={{ __html: funeralHomeJsonLd }}
                type={'application/ld+json'}
            />
            <SpeedInsights />
            <ToastContainer
                autoClose={5000}
                closeButton={false}
                closeOnClick={false}
                draggable={true}
                hideProgressBar={true}
                newestOnTop={false}
                position={'bottom-right'}
            />
            <QueryProvider>
                <ContentLayout>{children}</ContentLayout>
            </QueryProvider>
        </body>
    </html>
);

export default RootLayout;
