export type ServiceNavigationLink = {
    href: string;
    name: string;
};

export type ServiceNavigationGroup = {
    children: readonly ServiceNavigationLink[];
    href: string;
    name: string;
};

export type ServiceNavigationItem = ServiceNavigationGroup | ServiceNavigationLink;

export const isServiceNavigationGroup = (
    item: ServiceNavigationItem,
): item is ServiceNavigationGroup => 'children' in item;

export const serviceNavigationItems = [
    {
        name: 'Похороны',
        href: '/funeral#ServiceDetails',
        children: [
            {
                name: 'Эконом',
                href: '/funeral/economy#ServiceDetails',
            },
            {
                name: 'Эконом плюс',
                href: '/funeral/economy-plus#ServiceDetails',
            },
            {
                name: 'Стандарт',
                href: '/funeral/standard#ServiceDetails',
            },
            {
                name: 'Премиум',
                href: '/funeral/premium#ServiceDetails',
            },
        ],
    },
    {
        name: 'Кремация',
        href: '/cremation#ServiceDetails',
        children: [
            {
                name: 'Бесплатная',
                href: '/cremation/free#ServiceDetails',
            },
            {
                name: 'Платная',
                href: '/cremation/paid#ServiceDetails',
            },
        ],
    },
    {
        name: 'Транспортировка груза 200',
        href: '/cargo#ServiceDetails',
    },
    {
        name: 'Благоустройство захоронений',
        href: '/grave-improvement#ServiceDetails',
    },
] as const satisfies readonly ServiceNavigationItem[];
