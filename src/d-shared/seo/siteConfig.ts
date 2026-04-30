import type { Metadata, MetadataRoute } from 'next';

import { inlineText } from '@/d-shared/utils/inlineText';

export const SITE_NAME = 'Грань ДВ';
export const SITE_URL = 'https://грань-дв-хабаровск.рф';
export const SITE_HOST = new URL(SITE_URL).hostname;
export const SITE_LOCALE = 'ru_RU';
export const SITE_CITY = 'Хабаровск';
export const SITE_REGION = 'Хабаровский край';
export const SITE_STREET_ADDRESS = 'улица Карла Маркса, 176';
export const SITE_PHONE = '+79625873238';
export const SITE_EMAIL = 'z-l00@bk.ru';
export const SITE_2GIS_URL = 'https://2gis.ru/khabarovsk/firm/70000001101924571';
export const SITE_TELEGRAM_URL = 'https://t.me/ritual_uslugi_khv';
export const SITE_WHATSAPP_URL = 'https://wa.me/+79625873238';
export const SITE_LATITUDE = '48.502546';
export const SITE_LONGITUDE = '135.137629';
export const SITE_RATING = '5.0';
export const SITE_REVIEW_COUNT = '22';

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
        },
        twitter: {
            card: 'summary',
            title,
            description,
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

export const createLocalBusinessJsonLd = () => ({
    '@context': 'https://schema.org',
    '@type': 'FuneralHome',
    '@id': `${SITE_URL}/#organization`,
    name: SITE_NAME,
    url: SITE_URL,
    logo: getAbsoluteUrl('/desktop-logo.svg'),
    image: getAbsoluteUrl('/desktop-logo.svg'),
    telephone: SITE_PHONE,
    email: SITE_EMAIL,
    priceRange: '₽₽',
    address: {
        '@type': 'PostalAddress',
        streetAddress: SITE_STREET_ADDRESS,
        addressLocality: SITE_CITY,
        addressRegion: SITE_REGION,
        addressCountry: 'RU',
    },
    geo: {
        '@type': 'GeoCoordinates',
        latitude: SITE_LATITUDE,
        longitude: SITE_LONGITUDE,
    },
    openingHours: 'Mo-Su 00:00-23:59',
    areaServed: {
        '@type': 'City',
        name: SITE_CITY,
    },
    aggregateRating: {
        '@type': 'AggregateRating',
        ratingValue: SITE_RATING,
        reviewCount: SITE_REVIEW_COUNT,
        bestRating: '5',
    },
    sameAs: [SITE_2GIS_URL, SITE_TELEGRAM_URL, SITE_WHATSAPP_URL],
    hasOfferCatalog: {
        '@type': 'OfferCatalog',
        name: 'Ритуальные услуги',
        itemListElement: [
            {
                '@type': 'Offer',
                itemOffered: {
                    '@type': 'Service',
                    name: 'Организация похорон',
                    areaServed: SITE_CITY,
                },
            },
            {
                '@type': 'Offer',
                itemOffered: {
                    '@type': 'Service',
                    name: 'Кремация',
                    areaServed: SITE_CITY,
                },
            },
            {
                '@type': 'Offer',
                itemOffered: {
                    '@type': 'Service',
                    name: 'Транспортировка груза 200',
                    areaServed: SITE_CITY,
                },
            },
        ],
    },
});

export const stringifyJsonLd = (value: unknown) => JSON.stringify(value).replace(/</g, '\\u003c');
