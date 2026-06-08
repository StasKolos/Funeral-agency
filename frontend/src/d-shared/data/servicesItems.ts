import { serviceNavigationItems } from './serviceNavigationItems';

const [funeralNavigationGroup, cremationNavigationGroup, cargoService, graveImprovementService] =
    serviceNavigationItems;

export type ServiceButton = {
    href: string;
    name: string;
};

export type ServiceItem = {
    button: ServiceButton;
    cost: string;
    img: {
        alt: string;
        src: string;
    };
    list: string[];
    name: string;
};

export const servicesItems = [
    {
        name: 'Похороны',
        cost: '21 000',
        button: {
            href: funeralNavigationGroup.href,
            name: 'Подробнее',
        },
        img: {
            src: '/services-1.svg',
            alt: 'Иконка организации похорон',
        },
        list: ['гроб', 'памятник', 'бригада', 'катафалк', 'копка могилы'],
    },
    {
        name: 'Кремация',
        cost: '19 000',
        button: {
            href: cremationNavigationGroup.href,
            name: 'Подробнее',
        },
        img: {
            src: '/services-2.svg',
            alt: 'Иконка кремации',
        },
        list: ['кремация', 'гроб и урна', 'бригада', 'катафалк', 'копка могилы под урну'],
    },
    {
        name: 'Транспортировка груза 200',
        cost: '1 200',
        button: {
            href: cargoService.href,
            name: 'Подробнее',
        },
        img: {
            src: '/services-3.svg',
            alt: 'Иконка транспортировки груза 200',
        },
        list: ['железная дорога', 'самолёт', 'спецтранспорт', 'встреча и отправка в любой регион'],
    },
    {
        name: 'Благоустройство захоронений',
        cost: '2 800',
        button: {
            href: graveImprovementService.href,
            name: 'Подробнее',
        },
        img: {
            src: '/services-4.svg',
            alt: 'Иконка благоустройства захоронений',
        },
        list: ['песок', 'отсев', 'щебень', 'мраморная крошка', 'брусчатка', 'гранитная плитка'],
    },
    {
        name: 'Изготовление памятников',
        cost: '3 000',
        button: {
            href: '/products',
            name: 'Каталог',
        },
        img: {
            src: '/services-5.svg',
            alt: 'Иконка изготовления памятников',
        },
        list: ['памятник', 'гравировка', 'доставка', 'установка'],
    },
] satisfies ServiceItem[];
