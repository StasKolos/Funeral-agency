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
        href: '/funeral',
        children: [
            {
                name: 'Эконом',
                href: '/funeral/economy',
            },
            {
                name: 'Эконом плюс',
                href: '/funeral/economy-plus',
            },
            {
                name: 'Стандарт',
                href: '/funeral/standard',
            },
            {
                name: 'Премиум',
                href: '/funeral/premium',
            },
        ],
    },
    {
        name: 'Кремация',
        href: '/cremation',
        children: [
            {
                name: 'Бесплатная',
                href: '/cremation/free',
            },
            {
                name: 'Платная',
                href: '/cremation/paid',
            },
        ],
    },
    {
        name: 'Транспортировка груза 200',
        href: '/cargo',
    },
    {
        name: 'Благоустройство захоронений',
        href: '/grave-improvement',
    },
] as const satisfies readonly ServiceNavigationItem[];
