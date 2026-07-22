export type FuneralPackageAnchor = 'Economy' | 'EconomyPlus' | 'Premium' | 'Standard';

export type FuneralPackageComparisonValue = boolean | null | string;

export type FuneralPackageComparison = {
    ceremonySupport: FuneralPackageComparisonValue;
    coffin: FuneralPackageComparisonValue;
    support: FuneralPackageComparisonValue;
    graveDigging: FuneralPackageComparisonValue;
    hearse: FuneralPackageComparisonValue;
    kit: FuneralPackageComparisonValue;
    monument: FuneralPackageComparisonValue;
    nameplate: FuneralPackageComparisonValue;
    team: FuneralPackageComparisonValue;
};

export type FuneralPackage = {
    anchor: FuneralPackageAnchor;
    comparison: FuneralPackageComparison;
    details: {
        included: string[];
        useful: string[];
    };
    name: string;
    price: number;
    image: {
        alt: string;
        src: string;
    };
};

const priceFormatter = new Intl.NumberFormat('ru-RU');

export const formatFuneralPackagePrice = (price: number) =>
    priceFormatter.format(price).replaceAll('\u00a0', ' ').replaceAll('\u202f', ' ');

const funeralPackages = {
    economy: {
        anchor: 'Economy',
        name: 'Эконом',
        price: 21_000,
        image: {
            src: '/examples-13.webp',
            alt: [
                'Оформленное место захоронения с памятником и металлической оградой',
                '- тариф Эконом',
            ].join(' '),
        },
        details: {
            included: [
                'ситцевый гроб',
                'временный бетонный памятник',
                'табличка с ФИО',
                'бригада, катафалк и копка могилы',
                'организационное сопровождение от первого звонка до захоронения',
            ],
            useful: [
                'вещи для усопшего можно передать нашему сотруднику',
                'мы отвозим комплект в морг и передаем его санитару для одевания',
                'личные вещи можно заранее обсудить и передать отдельным пакетом',
                'в стандартном комплекте в гробу идет простая подушка',
                'при желании подушку можно заменить бесплатно',
            ],
        },
        comparison: {
            coffin: 'Ситцевый',
            monument: 'Временный бетонный',
            nameplate: true,
            team: true,
            hearse: true,
            graveDigging: true,
            support: 'Полное сопровождение',
            ceremonySupport: true,
            kit: 'Подушка',
        },
    },
    economyPlus: {
        anchor: 'EconomyPlus',
        name: 'Эконом-плюс',
        price: 40_000,
        image: {
            src: '/examples-5.webp',
            alt: [
                'Благоустроенное место захоронения с памятником и гранитной оградой',
                '- тариф Эконом-плюс',
            ].join(' '),
        },
        details: {
            included: [
                'бархатный гроб',
                'памятник из мраморной крошки',
                'бригада, катафалк и копка могилы',
                'помощь с документами и согласованием церемонии',
                'вывоз тела при заключении договора без отдельной платы',
            ],
            useful: [
                'памятник из мраморной крошки можно позже заменить на гранит',
                'тип будущей стелы можно обсудить после похорон',
                'подушку в комплекте в гробу можно заменить бесплатно по желанию семьи',
            ],
        },
        comparison: {
            coffin: 'Бархатный',
            monument: 'Из мраморной крошки',
            nameplate: null,
            team: true,
            hearse: true,
            graveDigging: true,
            support: 'Полное сопровождение',
            ceremonySupport: true,
            kit: 'Подушка и покрывало',
        },
    },
    standard: {
        anchor: 'Standard',
        name: 'Стандарт',
        price: 65_000,
        image: {
            src: '/examples-15.webp',
            alt: 'Благоустроенное место захоронения с гранитным памятником - тариф Стандарт',
        },
        details: {
            included: [
                'бархатный гроб',
                'памятник из серого или черного гранита высотой 800 мм',
                'бригада, катафалк и копка могилы',
                'помощь с документами и согласование даты церемонии',
                'организационное сопровождение семьи',
            ],
            useful: [
                'толщина гранитного памятника не влияет на стоимость тарифа',
                'вариант подходит, если нужен долговечный памятник без премиум-гроба',
                'дополнительные церемониальные услуги можно согласовать отдельно',
            ],
        },
        comparison: {
            coffin: 'Бархатный',
            monument: 'Серый или черный гранит, 800 мм',
            nameplate: null,
            team: true,
            hearse: true,
            graveDigging: true,
            support: 'Полное сопровождение',
            ceremonySupport: true,
            kit: 'Подушка и покрывало',
        },
    },
    premium: {
        anchor: 'Premium',
        name: 'Премиум',
        price: 90_000,
        image: {
            src: '/examples-28.webp',
            alt: 'Комплексное благоустройство места захоронения из чёрного гранита - тариф Премиум',
        },
        details: {
            included: [
                'лакированный гроб премиум-класса',
                'мягкая полноценная подушка в комплекте',
                'черный гранитный памятник от 1 метра',
                'бригада, катафалк и копка могилы',
                'сопровождение документов, прощания и погребения',
            ],
            useful: [
                'главное отличие тарифа - уровень гроба и комплекта принадлежностей',
                'лакированный гроб выглядит более представительно',
                'финальный состав лучше согласовать в смете до начала работ',
            ],
        },
        comparison: {
            coffin: 'Лакированный, премиум-класса',
            monument: 'Черный гранит от 1 метра',
            nameplate: null,
            team: true,
            hearse: true,
            graveDigging: true,
            support: 'Полное сопровождение',
            ceremonySupport: true,
            kit: 'Подушка и покрывало',
        },
    },
} satisfies Record<string, FuneralPackage>;

export const funeralItems: FuneralPackage[] = Object.values(funeralPackages);
