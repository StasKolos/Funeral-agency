import type { Metadata, MetadataRoute } from 'next';

import { inlineText } from '@/d-shared/utils/inlineText';

export const SITE_NAME = 'Грань ДВ';
export const SITE_URL = 'https://грань-дв-хабаровск.рф';
export const SITE_HOST = new URL(SITE_URL).hostname;
export const SITE_LOCALE = 'ru_RU';
export const SITE_OG_IMAGE = '/og-image.png';
export const SITE_OG_IMAGE_HEIGHT = 630;
export const SITE_OG_IMAGE_WIDTH = 1200;

const TITLE_TEMPLATE = `%s | ${SITE_NAME}`;
const DEFAULT_CHANGE_FREQUENCY = 'weekly';
const HOME_PRIORITY = 1;
const SECTION_PRIORITY = 0.8;

export const SITE_DESCRIPTION = inlineText`
    Ритуальное агентство в Хабаровске: организация похорон, кремация, транспортировка груза 200,
    перевозка умерших 24/7, благоустройство захоронений и продажа ритуальных товаров.
`;

export const SITE_KEYWORDS = [
    'ритуальные услуги Хабаровск',
    'организация похорон Хабаровск',
    'кремация Хабаровск',
    'груз 200 Хабаровск',
    'перевозка умерших Хабаровск',
    'благоустройство захоронений',
    'памятники Хабаровск',
];

type SiteRoute = {
    changeFrequency: MetadataRoute.Sitemap[number]['changeFrequency'];
    description: string;
    path: string;
    priority: number;
    title: string;
};

export const SITE_ROUTES = {
    home: {
        path: '/',
        title: 'Грань ДВ - ритуальные услуги в Хабаровске',
        description: SITE_DESCRIPTION,
        changeFrequency: DEFAULT_CHANGE_FREQUENCY,
        priority: HOME_PRIORITY,
    },
    services: {
        path: '/services',
        title: 'Услуги',
        description: inlineText`
            Организация похорон, кремация, транспортировка груза 200 и сопровождение
            ритуальных услуг в Хабаровске. Работаем круглосуточно.
        `,
        changeFrequency: DEFAULT_CHANGE_FREQUENCY,
        priority: SECTION_PRIORITY,
    },
    products: {
        path: '/products',
        title: 'Ритуальные товары',
        description: inlineText`
            Каталог ритуальных товаров в Хабаровске: памятники, венки, гробы, кресты, корзины,
            вазы и товары для благоустройства захоронений.
        `,
        changeFrequency: DEFAULT_CHANGE_FREQUENCY,
        priority: SECTION_PRIORITY,
    },
    contacts: {
        path: '/contacts',
        title: 'Контакты',
        description: inlineText`
            Контакты ритуального агентства Грань ДВ в Хабаровске: телефон, адрес офиса
            и способы связи для срочной помощи.
        `,
        changeFrequency: DEFAULT_CHANGE_FREQUENCY,
        priority: SECTION_PRIORITY,
    },
    about: {
        path: '/about',
        title: 'О компании',
        description: inlineText`
            Информация о ритуальном агентстве Грань ДВ: опыт, подход к организации похорон
            и поддержка семей в Хабаровске.
        `,
        changeFrequency: DEFAULT_CHANGE_FREQUENCY,
        priority: SECTION_PRIORITY,
    },
} satisfies Record<string, SiteRoute>;

export const getAbsoluteUrl = (path = '/') => new URL(path, SITE_URL).toString();

export const createPageMetadata = ({ description, path, title }: SiteRoute): Metadata => {
    const url = getAbsoluteUrl(path);
    const image = getAbsoluteUrl(SITE_OG_IMAGE);

    return {
        title,
        description,
        alternates: {
            canonical: url,
        },
        openGraph: {
            title,
            description,
            url,
            siteName: SITE_NAME,
            locale: SITE_LOCALE,
            type: 'website',
            images: [
                {
                    url: image,
                    width: SITE_OG_IMAGE_WIDTH,
                    height: SITE_OG_IMAGE_HEIGHT,
                    alt: SITE_NAME,
                },
            ],
        },
        twitter: {
            card: 'summary_large_image',
            title,
            description,
            images: [
                {
                    url: image,
                    alt: SITE_NAME,
                },
            ],
        },
    };
};

export const createRootMetadata = (): Metadata => ({
    ...createPageMetadata(SITE_ROUTES.home),
    metadataBase: new URL(SITE_URL),
    title: {
        default: SITE_ROUTES.home.title,
        template: TITLE_TEMPLATE,
    },
    applicationName: SITE_NAME,
    authors: [{ name: SITE_NAME, url: SITE_URL }],
    creator: SITE_NAME,
    publisher: SITE_NAME,
    category: 'Ритуальные услуги',
    keywords: SITE_KEYWORDS,
    robots: {
        index: true,
        follow: true,
        googleBot: {
            index: true,
            follow: true,
            'max-image-preview': 'large',
            'max-snippet': -1,
            'max-video-preview': -1,
        },
    },
});

export const createWebSiteJsonLd = () => ({
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `${SITE_URL}/#website`,
    name: SITE_NAME,
    url: SITE_URL,
    description: SITE_DESCRIPTION,
    inLanguage: 'ru-RU',
});

export const stringifyJsonLd = (value: unknown) => JSON.stringify(value).replace(/</g, '\\u003c');
