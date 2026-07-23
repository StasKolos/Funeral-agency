/* eslint-disable max-lines */
import type { Metadata, MetadataRoute } from 'next';

import { SITE_KEYWORDS } from '@/d-shared/seo/siteKeywords';
import { inlineText } from '@/d-shared/utils/inlineText';

export const SITE_NAME = 'Грань ДВ';
export const SITE_URL = 'https://грань-дв-хабаровск.рф';
export const SITE_HOST = new URL(SITE_URL).hostname;
export const SITE_LOCALE = 'ru_RU';
export const SITE_OG_IMAGE = '/og-image.png';
export const SITE_OG_IMAGE_HEIGHT = 630;
export const SITE_OG_IMAGE_WIDTH = 1200;
export const SITE_PHONE = '+79625873238';
export const SITE_EMAIL = 'z-l00@bk.ru';
export const SITE_ADDRESS_STREET = 'улица Карла Маркса, дом 176';
export const SITE_ADDRESS_CITY = 'Хабаровск';
export const SITE_ADDRESS_REGION = 'Хабаровский край';
export const SITE_ADDRESS_COUNTRY = 'RU';
export const SITE_LATITUDE = 48.502546;
export const SITE_LONGITUDE = 135.137629;
export const SITE_2GIS_URL = 'https://2gis.ru/khabarovsk/firm/70000001101924571';
export const SITE_YANDEX_MAPS_URL = 'https://yandex.ru/maps/org/gran_dv/245556292587/';
export const SITE_TELEGRAM_URL = 'https://t.me/ritual_uslugi_khv';
export const SITE_WHATSAPP_URL = 'https://wa.me/79625873238';

const TITLE_TEMPLATE = `%s | ${SITE_NAME}`;
const DEFAULT_CHANGE_FREQUENCY = 'weekly';
const HOME_PRIORITY = 1;
const SECTION_PRIORITY = 0.8;
const WEEK_DAYS = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

export const SITE_DESCRIPTION = inlineText`
    Ритуальные услуги и ритуальное агентство в Хабаровске: похороны от 21 000 ₽,
    кремация от 19 000 ₽, благоустройство захоронений, перевозка умерших 24/7.
    Звоните: +7 (962) 587-32-38.
`;

export type SiteRoute = {
    changeFrequency: MetadataRoute.Sitemap[number]['changeFrequency'];
    description: string;
    offerPrice?: string;
    path: string;
    priority: number;
    title: string;
};

const createSectionRoute = (
    path: string,
    title: string,
    description: string,
    offerPrice?: string,
): SiteRoute => ({
    path,
    title,
    description,
    ...(offerPrice ? { offerPrice } : {}),
    changeFrequency: DEFAULT_CHANGE_FREQUENCY,
    priority: SECTION_PRIORITY,
});

export const SITE_ROUTES = {
    home: {
        path: '/',
        title: 'Ритуальные услуги и ритуальное агентство в Хабаровске | Грань ДВ',
        description: SITE_DESCRIPTION,
        changeFrequency: DEFAULT_CHANGE_FREQUENCY,
        priority: HOME_PRIORITY,
    },
    funeralService: createSectionRoute(
        '/funeral',
        'Организация похорон в Хабаровске',
        inlineText`
            Организация похорон в Хабаровске от 21 000 ₽: перевозка в морг, документы,
            гроб, катафалк, бригада и захоронение. Поможем 24/7: +7 (962) 587-32-38.
        `,
        '21000',
    ),
    cremationService: createSectionRoute(
        '/cremation',
        'Кремация тела человека: цена в Хабаровске',
        inlineText`
            Кремация тела человека в Хабаровске: платная кремация от 19 000 ₽
            и бесплатный вариант. Документы, гроб, урна, транспорт и помощь семье.
        `,
        '19000',
    ),
    cargoService: createSectionRoute(
        '/cargo',
        'Перевозка тела умершего в Хабаровске',
        inlineText`
            Перевозка тела умершего в Хабаровске от 1 200 ₽: катафалк до морга,
            доставка на похороны, перевозка умершего, спецтранспорт и авиа. Работаем 24/7.
        `,
        '1200',
    ),
    graveImprovementService: createSectionRoute(
        '/grave-improvement',
        'Благоустройство могил и установка памятника в Хабаровске',
        inlineText`
            Благоустройство могил в Хабаровске от 3 000 ₽: уборка, замеры,
            установка памятника, плитка, ограды, столы и лавки. Бесплатный выезд.
        `,
        '3000',
    ),
    products: createSectionRoute(
        '/products',
        'Ритуальные товары и принадлежности в Хабаровске',
        inlineText`
            Ритуальные товары и принадлежности в Хабаровске от 1 000 ₽:
            гробы, венки, кресты, памятники, корзины, вазы и товары для могил.
        `,
    ),
    contacts: createSectionRoute(
        '/contacts',
        'Контакты ритуального агентства в Хабаровске',
        inlineText`
            Контакты ритуального агентства Грань ДВ в Хабаровске: телефон
            +7 (962) 587-32-38, адрес офиса и срочная помощь с похоронами 24/7.
        `,
    ),
    about: createSectionRoute(
        '/about',
        'О ритуальном агентстве в Хабаровске',
        inlineText`
            Грань ДВ - ритуальное агентство в Хабаровске: организация похорон,
            кремация, перевозка умерших и поддержка семьи на каждом этапе.
        `,
    ),
} satisfies Record<string, SiteRoute>;

export const getAbsoluteUrl = (path = '/') => new URL(path, SITE_URL).toString();

const getRouteByPath = (path: string) =>
    Object.values(SITE_ROUTES).find((route) => route.path === path);

const getBreadcrumbItems = ({ path, title }: SiteRoute) => {
    const segments = path.split('/').filter(Boolean);
    const items = [{ name: 'Главная', path: '/' }];
    let currentPath = '';

    segments.forEach((segment) => {
        currentPath = `${currentPath}/${segment}`;
        const route = getRouteByPath(currentPath);

        items.push({
            name: route?.title ?? title,
            path: currentPath,
        });
    });

    return items;
};

export const createBreadcrumbJsonLd = (route: SiteRoute) => ({
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: getBreadcrumbItems(route).map((item, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        name: item.name,
        item: getAbsoluteUrl(item.path),
    })),
});

export const createServiceJsonLd = (route: SiteRoute) => {
    if (!route.offerPrice) return null;

    return {
        '@context': 'https://schema.org',
        '@type': 'Service',
        '@id': `${getAbsoluteUrl(route.path)}#service`,
        name: route.title,
        description: route.description,
        provider: { '@id': `${SITE_URL}/#funeral-home` },
        areaServed: { '@type': 'City', name: SITE_ADDRESS_CITY },
        offers: {
            '@type': 'Offer',
            price: route.offerPrice,
            priceCurrency: 'RUB',
            url: getAbsoluteUrl(route.path),
            availability: 'https://schema.org/InStock',
        },
    };
};

export const createPageJsonLd = (route: SiteRoute) =>
    [createBreadcrumbJsonLd(route), createServiceJsonLd(route)].filter(Boolean);

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

export const createFuneralHomeJsonLd = () => ({
    '@context': 'https://schema.org',
    '@type': 'FuneralHome',
    '@id': `${SITE_URL}/#funeral-home`,
    name: SITE_NAME,
    url: SITE_URL,
    image: getAbsoluteUrl(SITE_OG_IMAGE),
    telephone: SITE_PHONE,
    email: SITE_EMAIL,
    description: SITE_DESCRIPTION,
    address: {
        '@type': 'PostalAddress',
        streetAddress: SITE_ADDRESS_STREET,
        addressLocality: SITE_ADDRESS_CITY,
        addressRegion: SITE_ADDRESS_REGION,
        addressCountry: SITE_ADDRESS_COUNTRY,
    },
    geo: {
        '@type': 'GeoCoordinates',
        latitude: SITE_LATITUDE,
        longitude: SITE_LONGITUDE,
    },
    areaServed: { '@type': 'City', name: SITE_ADDRESS_CITY },
    openingHoursSpecification: [
        {
            '@type': 'OpeningHoursSpecification',
            dayOfWeek: WEEK_DAYS,
            opens: '00:00',
            closes: '23:59',
        },
    ],
    contactPoint: [
        {
            '@type': 'ContactPoint',
            telephone: SITE_PHONE,
            contactType: 'customer service',
            areaServed: SITE_ADDRESS_COUNTRY,
            availableLanguage: ['Russian'],
        },
    ],
    sameAs: [SITE_2GIS_URL, SITE_YANDEX_MAPS_URL, SITE_TELEGRAM_URL, SITE_WHATSAPP_URL],
});

export const stringifyJsonLd = (value: unknown) => JSON.stringify(value).replace(/</g, '\\u003c');

export const createPageJsonLdString = (route: SiteRoute) =>
    stringifyJsonLd(createPageJsonLd(route));
