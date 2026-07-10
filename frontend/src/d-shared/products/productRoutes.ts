import type { ProductCategory } from '@/d-shared/api/types';

import { inlineText } from '@/d-shared/utils/inlineText';

export const PRODUCTS_PAGE_SIZE = 10;

const PRODUCT_CATEGORY_CODE_ALIASES: Record<string, string> = {
    HORIZONTAL_MONUMENT: 'MONUMENT',
    VERTICAL_MONUMENT: 'MONUMENT',
};

const PRODUCT_CATEGORY_SEO: Record<
    string,
    {
        description: string;
        h1: string;
        mainDescription: string;
        title: string;
    }
> = {
    BALLS: {
        title: 'Гранитные шары на могилу: цены в Хабаровске',
        h1: 'Гранитные шары на могилу в Хабаровске',
        description: inlineText`
            Гранитные шары на могилу в Хабаровске от 2 000 ₽: подберём декоративные
            элементы для памятника, захоронения и оформления участка.
        `,
        mainDescription: inlineText`
            Подберём гранитные шары для оформления захоронения и сочетания с памятником,
            вазами, оградой и другими элементами благоустройства могилы.
        `,
    },
    BASKETS: {
        title: 'Ритуальные корзины на похороны: купить в Хабаровске',
        h1: 'Ритуальные корзины на похороны в Хабаровске',
        description: inlineText`
            Ритуальные корзины на похороны в Хабаровске от 1 000 ₽: траурные композиции
            для прощания, церемонии и возложения на могилу.
        `,
        mainDescription: inlineText`
            Поможем выбрать ритуальную корзину для церемонии прощания, возложения на могилу
            или оформления траурной композиции с учётом повода и бюджета.
        `,
    },
    COFFIN: {
        title: 'Купить гроб: цены в Хабаровске',
        h1: 'Купить гроб в Хабаровске',
        description: inlineText`
            Купить гроб в Хабаровске от 5 000 ₽: простые, бархатные и лакированные гробы,
            подбор по цене и доставка к церемонии.
        `,
        mainDescription: inlineText`
            Подберём гроб под бюджет и формат похорон: простой, бархатный или лакированный.
            Объясним отличия, комплектацию и поможем согласовать доставку к церемонии.
        `,
    },
    CROSS: {
        title: 'Кресты на могилу и памятник: цены в Хабаровске',
        h1: 'Кресты на могилу и памятник в Хабаровске',
        description: inlineText`
            Кресты на могилу и памятник в Хабаровске от 4 000 ₽: временные и постоянные
            могильные кресты с подбором под захоронение.
        `,
        mainDescription: inlineText`
            Подберём крест для временного или постоянного оформления могилы,
            поможем выбрать подходящий вариант и согласовать установку на месте захоронения.
        `,
    },
    FENCES: {
        title: 'Ограды на могилу: цены в Хабаровске',
        h1: 'Ограды на могилу в Хабаровске',
        description: inlineText`
            Ограды на могилу в Хабаровске от 5 000 ₽: подберём ограду под участок,
            памятник и благоустройство места захоронения.
        `,
        mainDescription: inlineText`
            Подберём ограду для участка на кладбище, учтём размеры места захоронения,
            тип памятника и общий вид будущего благоустройства.
        `,
    },
    MONUMENT: {
        title: 'Памятники на могилу: заказать, цены в Хабаровске',
        h1: 'Памятники и надгробные плиты на могилу в Хабаровске',
        description: inlineText`
            Памятники на могилу в Хабаровске от 3 000 ₽: стелы, надгробные плиты,
            гранит, подбор формы, цены и консультация по установке.
        `,
        mainDescription: inlineText`
            Поможем выбрать памятник, стелу или надгробную плиту на могилу,
            объясним варианты гранита, форму, размеры и порядок дальнейшей установки.
        `,
    },
    TABLES_AND_CHAIRS: {
        title: 'Столы и лавки на могилу: цены в Хабаровске',
        h1: 'Столы и лавки на могилу в Хабаровске',
        description: inlineText`
            Столы и лавки на могилу в Хабаровске от 10 000 ₽: ритуальные столики
            и скамейки для благоустройства места захоронения.
        `,
        mainDescription: inlineText`
            Подберём стол и лавку для благоустройства места захоронения,
            чтобы участок был удобным для посещения и сочетался с памятником и оградой.
        `,
    },
    VASES: {
        title: 'Вазы на могилу: купить в Хабаровске',
        h1: 'Вазы на могилу в Хабаровске',
        description: inlineText`
            Вазы на могилу в Хабаровске от 2 000 ₽: варианты для живых и искусственных
            цветов, подбор под памятник и оформление участка.
        `,
        mainDescription: inlineText`
            Поможем выбрать вазу на могилу для живых или искусственных цветов,
            подскажем подходящий вариант под памятник, плиту и общее оформление участка.
        `,
    },
    WREATHS: {
        title: 'Купить ритуальные венки и цветы на похороны в Хабаровске',
        h1: 'Купить ритуальные венки и цветы на похороны в Хабаровске',
        description: inlineText`
            Купить ритуальные венки и цветы на похороны в Хабаровске от 1 000 ₽:
            траурные композиции для прощания, возложения и церемонии.
        `,
        mainDescription: inlineText`
            Подберём ритуальный венок или траурные цветы для церемонии прощания,
            возложения на могилу и оформления похорон с учётом пожеланий семьи.
        `,
    },
};

export const getCanonicalProductCategoryCode = (categoryCode: string) => {
    const normalizedCode = categoryCode.toUpperCase();

    return PRODUCT_CATEGORY_CODE_ALIASES[normalizedCode] ?? normalizedCode;
};

export const getProductCategorySlug = (categoryCode: string) =>
    getCanonicalProductCategoryCode(categoryCode).toLowerCase().replace(/_/g, '-');

export const getProductCategoryPath = (categoryCode: string) =>
    `/products/${encodeURIComponent(getProductCategorySlug(categoryCode))}`;

export const getCanonicalProductCategorySlug = (slug: string) =>
    getProductCategorySlug(decodeURIComponent(slug));

export const findProductCategoryBySlug = (categories: ProductCategory[], slug: string) => {
    const normalizedSlug = getCanonicalProductCategorySlug(slug);

    return categories.find((category) => getProductCategorySlug(category.code) === normalizedSlug);
};

const getProductCategorySeo = (category: ProductCategory) =>
    PRODUCT_CATEGORY_SEO[getCanonicalProductCategoryCode(category.code)];

export const createProductCategoryTitle = (category: ProductCategory) =>
    getProductCategorySeo(category)?.title ?? `${category.name} в Хабаровске`;

export const createProductCategoryH1 = (category: ProductCategory) =>
    getProductCategorySeo(category)?.h1 ?? `${category.name} в Хабаровске`;

export const createProductCategoryMainDescription = (category: ProductCategory) =>
    getProductCategorySeo(category)?.mainDescription ??
    inlineText`
        Подберём товары из категории ${category.name.toLowerCase()} в Хабаровске,
        поможем выбрать подходящий вариант и согласовать детали заказа.
    `;

export const createProductCategoryDescription = (category: ProductCategory) =>
    getProductCategorySeo(category)?.description ??
    inlineText`
        Каталог товаров категории «${category.name}» в Хабаровске: ритуальные товары
        и принадлежности с подбором под задачу семьи. Цены уточним по телефону.
    `;
