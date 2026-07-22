export type CremationOptionAnchor = 'Free' | 'Paid';

export type CremationOptionDetails = {
    included: string[];
    useful: string[];
};

export type CremationOptionComparisonValue = boolean | null | string;

export type CremationOptionComparison = {
    clothesTransfer: CremationOptionComparisonValue;
    coffin: CremationOptionComparisonValue;
    conditions: CremationOptionComparisonValue;
    cremation: CremationOptionComparisonValue;
    farewell: CremationOptionComparisonValue;
    hearse: CremationOptionComparisonValue;
    support: CremationOptionComparisonValue;
    team: CremationOptionComparisonValue;
    urn: CremationOptionComparisonValue;
    urnGraveDigging: CremationOptionComparisonValue;
};

export type CremationOption = {
    anchor: CremationOptionAnchor;
    comparison: CremationOptionComparison;
    details: CremationOptionDetails;
    image: {
        alt: string;
        src: string;
    };
    name: string;
    price: number;
};

export const cremationOptionDetails = {
    free: {
        included: [
            'проверка возможности бесплатной кремации в конкретной ситуации',
            'консультация по документам и дальнейшим действиям',
            'передача вещей для одевания через нашего специалиста',
        ],
        useful: [
            'возможность бесплатной кремации проверяется отдельно для каждой ситуации',
            'бесплатный вариант ограничен базовым составом услуг',
            'урна, прощание и дополнительные принадлежности обсуждаются отдельно',
        ],
    },
    paid: {
        included: [
            'платная кремация',
            'гроб, урна, катафалк и бригада',
            'копка могилы под урну',
            'оформление документов',
            'передача вещей в морг через нашего сотрудника',
        ],
        useful: [
            'комплект вещей для одевания можно передать нашему специалисту',
            'личные вещи усопшего можно заранее обсудить по телефону',
            'стоимость может измениться при выборе дополнительных принадлежностей',
        ],
    },
};

const priceFormatter = new Intl.NumberFormat('ru-RU');

export const formatCremationOptionPrice = ({ price }: CremationOption) =>
    price === 0
        ? 'При наличии оснований - 0 ₽'
        : `От ${priceFormatter
              .format(price)
              .replaceAll('\u00a0', ' ')
              .replaceAll('\u202f', ' ')} ₽`;

export const cremationItems = [
    {
        anchor: 'Free',
        name: 'Бесплатная',
        price: 0,
        image: {
            src: '/cremation-free.webp',
            alt: 'Здание крематория - бесплатный вариант кремации',
        },
        details: cremationOptionDetails.free,
        comparison: {
            conditions: 'Проверяется индивидуально',
            cremation: true,
            support: 'Консультация по документам',
            coffin: 'Уточняется отдельно',
            urn: 'Уточняется отдельно',
            hearse: 'Уточняется отдельно',
            team: 'Уточняется отдельно',
            clothesTransfer: true,
            farewell: 'Уточняется отдельно',
            urnGraveDigging: 'Уточняется отдельно',
        },
    },
    {
        anchor: 'Paid',
        name: 'Платная',
        price: 19_000,
        image: {
            src: '/cremation-paid.webp',
            alt: 'Сотрудники крематория подготавливают гроб к проведению платной кремации',
        },
        details: cremationOptionDetails.paid,
        comparison: {
            conditions: 'Состав согласовывается заранее',
            cremation: true,
            support: 'Полное сопровождение',
            coffin: true,
            urn: true,
            hearse: true,
            team: true,
            clothesTransfer: true,
            farewell: 'Уточняется отдельно',
            urnGraveDigging: true,
        },
    },
] satisfies CremationOption[];
