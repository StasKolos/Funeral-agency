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
                href: '/funeral#Economy',
            },
            {
                name: 'Эконом-плюс',
                href: '/funeral#EconomyPlus',
            },
            {
                name: 'Стандарт',
                href: '/funeral#Standard',
            },
            {
                name: 'Премиум',
                href: '/funeral#Premium',
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
        name: 'Транспортировка тела умершего',
        href: '/cargo#ServiceDetails',
    },
    {
        name: 'Благоустройство захоронений',
        href: '/grave-improvement#ServiceDetails',
    },
] as const satisfies readonly ServiceNavigationItem[];
