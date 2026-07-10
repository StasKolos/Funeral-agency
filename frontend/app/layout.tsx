import type { Metadata } from 'next';

import { SpeedInsights } from '@vercel/speed-insights/next';
import { Montserrat } from 'next/font/google';
import Script from 'next/script';
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
const googleTagId = 'G-CGW3F0KX93';
const googleTagScriptUrl = `https://www.googletagmanager.com/gtag/js?id=${googleTagId}`;
const googleTagCounter = `
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());
    gtag('config', '${googleTagId}');
`;
const yandexMetrikaCounter = `
    (function(m,e,t,r,i,k,a){
        m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};
        m[i].l=1*new Date();
        for (var j = 0; j < document.scripts.length; j++) {
            if (document.scripts[j].src === r) { return; }
        }
        k=e.createElement(t);
        a=e.getElementsByTagName(t)[0];
        k.async=1;
        k.src=r;
        a.parentNode.insertBefore(k,a);
    })(window, document,'script','https://mc.yandex.ru/metrika/tag.js?id=110567319', 'ym');

    ym(110567319, 'init', {
        ssr:true,
        webvisor:true,
        clickmap:true,
        ecommerce:"dataLayer",
        referrer: document.referrer,
        url: location.href,
        accurateTrackBounce:true,
        trackLinks:true
    });
`;

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
            <Script
                dangerouslySetInnerHTML={{ __html: yandexMetrikaCounter }}
                id={'yandex-metrika'}
                strategy={'beforeInteractive'}
                type={'text/javascript'}
            />
            <Script
                async={true}
                id={'google-tag-manager'}
                src={googleTagScriptUrl}
                strategy={'afterInteractive'}
            />
            <Script
                dangerouslySetInnerHTML={{ __html: googleTagCounter }}
                id={'google-tag'}
                strategy={'afterInteractive'}
            />
            <noscript
                dangerouslySetInnerHTML={{
                    __html: `
                        <div>
                            <img src="https://mc.yandex.ru/watch/110567319" style="position:absolute; left:-9999px;" alt="" />
                        </div>
                    `,
                }}
            />
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
