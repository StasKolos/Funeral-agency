export const cremationItems = [
    {
        name: 'Бесплатная',
        free: 'Бесплатно',
        button: {
            href: '/cremation/free#ServiceDetails',
            name: 'Подробнее',
        },
        img: {
            src: '/cremation-1.svg',
            alt: 'Иконка бесплатной кремации',
        },
        list: ['за счёт государства'],
    },
    {
        name: 'Платная',
        cost: '19 000',
        button: {
            href: '/cremation/paid#ServiceDetails',
            name: 'Подробнее',
        },
        img: {
            src: '/cremation-2.svg',
            alt: 'Иконка платной кремации',
        },
        list: [
            'платная кремация',
            'гроб',
            'урна',
            'катафалк',
            'бригада',
            'копка могилы под урну',
            'оформление документов',
        ],
    },
];
