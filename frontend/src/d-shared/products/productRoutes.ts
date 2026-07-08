import type { ProductCategory } from '@/d-shared/api/types';

export const PRODUCTS_PAGE_SIZE = 10;

const PRODUCT_CATEGORY_CODE_ALIASES: Record<string, string> = {
    HORIZONTAL_MONUMENT: 'MONUMENT',
    VERTICAL_MONUMENT: 'MONUMENT',
};

const PRODUCT_CATEGORY_SEO: Record<
    string,
    {
        h1: string;
        mainDescription: string;
        title: string;
    }
> = {
    BALLS: {
        title: 'Гранитные шары на могилу: цены в Хабаровске',
        h1: 'Гранитные шары на могилу в Хабаровске',
        mainDescription: [
            'Подберём гранитные шары для оформления захоронения и сочетания с памятником,',
            'вазами, оградой и другими элементами благоустройства могилы.',
        ].join(' '),
    },
    BASKETS: {
        title: 'Ритуальные корзины на похороны: купить в Хабаровске',
        h1: 'Ритуальные корзины на похороны в Хабаровске',
        mainDescription: [
            'Поможем выбрать ритуальную корзину для церемонии прощания, возложения на могилу',
            'или оформления траурной композиции с учётом повода и бюджета.',
        ].join(' '),
    },
    COFFIN: {
        title: 'Купить гроб: цены в Хабаровске',
        h1: 'Купить гроб в Хабаровске',
        mainDescription: [
            'Подберём гроб под бюджет и формат похорон: простой, бархатный или лакированный.',
            'Объясним отличия, комплектацию и поможем согласовать доставку к церемонии.',
        ].join(' '),
    },
    CROSS: {
        title: 'Кресты на могилу и памятник: цены в Хабаровске',
        h1: 'Кресты на могилу и памятник в Хабаровске',
        mainDescription: [
            'Подберём крест для временного или постоянного оформления могилы,',
            'поможем выбрать подходящий вариант и согласовать установку на месте захоронения.',
        ].join(' '),
    },
    FENCES: {
        title: 'Ограды на могилу: цены в Хабаровске',
        h1: 'Ограды на могилу в Хабаровске',
        mainDescription: [
            'Подберём ограду для участка на кладбище, учтём размеры места захоронения,',
            'тип памятника и общий вид будущего благоустройства.',
        ].join(' '),
    },
    MONUMENT: {
        title: 'Памятники на могилу: заказать, цены в Хабаровске',
        h1: 'Памятники и надгробные плиты на могилу в Хабаровске',
        mainDescription: [
            'Поможем выбрать памятник, стелу или надгробную плиту на могилу,',
            'объясним варианты гранита, форму, размеры и порядок дальнейшей установки.',
        ].join(' '),
    },
    TABLES_AND_CHAIRS: {
        title: 'Столы и лавки на могилу: цены в Хабаровске',
        h1: 'Столы и лавки на могилу в Хабаровске',
        mainDescription: [
            'Подберём стол и лавку для благоустройства места захоронения,',
            'чтобы участок был удобным для посещения и сочетался с памятником и оградой.',
        ].join(' '),
    },
    VASES: {
        title: 'Вазы на могилу: купить в Хабаровске',
        h1: 'Вазы на могилу в Хабаровске',
        mainDescription: [
            'Поможем выбрать вазу на могилу для живых или искусственных цветов,',
            'подскажем подходящий вариант под памятник, плиту и общее оформление участка.',
        ].join(' '),
    },
    WREATHS: {
        title: 'Купить ритуальные венки и цветы на похороны в Хабаровске',
        h1: 'Купить ритуальные венки и цветы на похороны в Хабаровске',
        mainDescription: [
            'Подберём ритуальный венок или траурные цветы для церемонии прощания,',
            'возложения на могилу и оформления похорон с учётом пожеланий семьи.',
        ].join(' '),
    },
};

export const getCanonicalProductCategoryCode = (categoryCode: string) => {
    const normalizedCode = categoryCode.toUpperCase();

    return PRODUCT_CATEGORY_CODE_ALIASES[normalizedCode] ?? normalizedCode;
};

export const getProductCategorySlug = (categoryCode: string) =>
    getCanonicalProductCategoryCode(categoryCode).toLowerCase();

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
    [
        `Подберём товары из категории ${category.name.toLowerCase()} в Хабаровске,`,
        'поможем выбрать подходящий вариант и согласовать детали заказа.',
    ].join(' ');

export const createProductCategoryDescription = (category: ProductCategory) =>
    [
        `Каталог ${category.name.toLowerCase()} в Хабаровске:`,
        'ритуальные товары и принадлежности с подбором под задачу семьи.',
    ].join(' ');
