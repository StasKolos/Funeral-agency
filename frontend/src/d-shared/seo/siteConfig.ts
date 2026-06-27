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
    Ритуальное агентство в Хабаровске: организация похорон, кремация, транспортировка груза 200,
    перевозка умерших 24/7, благоустройство захоронений и продажа ритуальных товаров.
`;

type SiteRoute = {
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
        title: 'Грань ДВ - ритуальные услуги в Хабаровске',
        description: SITE_DESCRIPTION,
        changeFrequency: DEFAULT_CHANGE_FREQUENCY,
        priority: HOME_PRIORITY,
    },
    services: createSectionRoute(
        '/services',
        'Услуги',
        inlineText`
            Организация похорон, кремация, транспортировка груза 200 и сопровождение
            ритуальных услуг в Хабаровске. Работаем круглосуточно.
        `,
    ),
    funeralService: createSectionRoute(
        '/funeral',
        'Похороны',
        inlineText`
            Организация похорон в Хабаровске: вызов служб, перевозка в морг, оформление документов,
            выбор тарифа, прощание, отпевание, катафалк, бригада и захоронение.
        `,
        '21000',
    ),
    funeralEconomyService: createSectionRoute(
        '/funeral/economy',
        'Похороны эконом',
        inlineText`
            Похороны эконом в Хабаровске от 21 000 ₽: ситцевый гроб, временный бетонный памятник,
            табличка с ФИО, катафалк, бригада, копка могилы и сопровождение документов.
        `,
        '21000',
    ),
    funeralEconomyPlusService: createSectionRoute(
        '/funeral/economy-plus',
        'Похороны эконом плюс',
        inlineText`
            Похороны эконом плюс в Хабаровске от 40 000 ₽: бархатный гроб, памятник из
            мраморной крошки, катафалк, бригада, копка могилы и помощь с документами.
        `,
        '40000',
    ),
    funeralStandardService: createSectionRoute(
        '/funeral/standard',
        'Похороны стандарт',
        inlineText`
            Похороны стандарт в Хабаровске от 65 000 ₽: бархатный гроб, памятник из серого
            или черного гранита 800 мм, транспорт, бригада, документы и сопровождение семьи.
        `,
        '65000',
    ),
    funeralPremiumService: createSectionRoute(
        '/funeral/premium',
        'Похороны премиум',
        inlineText`
            Похороны премиум в Хабаровске от 90 000 ₽: лакированный гроб премиум-класса,
            мягкая подушка, гранитный памятник, транспорт, бригада и сопровождение церемонии.
        `,
        '90000',
    ),
    cremationService: createSectionRoute(
        '/cremation',
        'Кремация',
        inlineText`
            Кремация в Хабаровске: бесплатный и платный вариант, оформление документов,
            передача вещей в морг, гроб, урна, транспорт и сопровождение семьи.
        `,
        '19000',
    ),
    cremationFreeService: createSectionRoute(
        '/cremation/free',
        'Бесплатная кремация',
        inlineText`
            Бесплатная кремация в Хабаровске: проверка условий, консультация по документам,
            передача вещей в морг через специалиста и базовое сопровождение семьи.
        `,
        '0',
    ),
    cremationPaidService: createSectionRoute(
        '/cremation/paid',
        'Платная кремация',
        inlineText`
            Платная кремация в Хабаровске: гроб, урна, катафалк, бригада, копка могилы под урну,
            оформление документов и передача вещей в морг через специалиста.
        `,
        '19000',
    ),
    cargoService: createSectionRoute(
        '/cargo',
        'Транспортировка груза 200',
        inlineText`
            Транспортировка груза 200 из Хабаровска и в Хабаровск: документы, бальзамирование,
            цинковый короб, наземная перевозка или авиа и доставка до согласованного адреса.
        `,
        '1200',
    ),
    graveImprovementService: createSectionRoute(
        '/grave-improvement',
        'Благоустройство захоронений',
        inlineText`
            Благоустройство захоронений в Хабаровске: бесплатный выезд, осмотр, замеры,
            памятники, лавочки, столы, фундамент, стяжка, плитка, брусчатка и гранит.
        `,
        '2800',
    ),
    products: createSectionRoute(
        '/products',
        'Ритуальные товары',
        inlineText`
            Каталог ритуальных товаров в Хабаровске: памятники, венки, гробы, кресты, корзины,
            вазы и товары для благоустройства захоронений.
        `,
    ),
    contacts: createSectionRoute(
        '/contacts',
        'Контакты',
        inlineText`
            Контакты ритуального агентства Грань ДВ в Хабаровске: телефон, адрес офиса
            и способы связи для срочной помощи.
        `,
    ),
    about: createSectionRoute(
        '/about',
        'О компании',
        inlineText`
            Информация о ритуальном агентстве Грань ДВ: опыт, подход к организации похорон
            и поддержка семей в Хабаровске.
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
            opens: '09:00',
            closes: '18:00',
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
