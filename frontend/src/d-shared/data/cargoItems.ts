export type CargoOptionAnchor = 'Air' | 'Khabarovsk' | 'Rail';

export type CargoOptionComparisonValue = boolean | null | string;

export type CargoOptionComparison = {
    agentSupport: CargoOptionComparisonValue;
    carrierCoordination: CargoOptionComparisonValue;
    destinationMeeting: CargoOptionComparisonValue;
    documents: CargoOptionComparisonValue;
    geography: CargoOptionComparisonValue;
    hearse: CargoOptionComparisonValue;
    preparation: CargoOptionComparisonValue;
    roundTheClock: CargoOptionComparisonValue;
    ticketsAndFees: CargoOptionComparisonValue;
    zincContainer: CargoOptionComparisonValue;
};

export type CargoOption = {
    anchor: CargoOptionAnchor;
    comparison: CargoOptionComparison;
    details: {
        included: string[];
        useful: string[];
    };
    image: {
        alt: string;
        height: number;
        src: string;
        width: number;
    };
    name: string;
    price: number;
};

const priceFormatter = new Intl.NumberFormat('ru-RU');
const toText = (parts: string[]) => parts.join(' ');

export const formatCargoOptionPrice = (price: number) =>
    priceFormatter.format(price).replaceAll('\u00a0', ' ').replaceAll('\u202f', ' ');

export const cargoItems: CargoOption[] = [
    {
        anchor: 'Khabarovsk',
        name: 'Перевозка по Хабаровску',
        price: 1_200,
        image: {
            src: '/khabarovsk-cargo.webp',
            alt: 'Организация перевозки умершего катафалком по Хабаровску',
            width: 1024,
            height: 683,
        },
        comparison: {
            geography: 'Хабаровск',
            roundTheClock: true,
            destinationMeeting: true,
            hearse: true,
            agentSupport: true,
            documents: 'Полное сопровождение',
            carrierCoordination: false,
            preparation: 'По обстоятельствам',
            zincContainer: 'По требованиям маршрута',
            ticketsAndFees: false,
        },
        details: {
            included: [
                'встреча и доставка умершего от места вызова по согласованному адресу',
                'круглосуточная подача катафалка к дому, моргу или месту прощания',
                'перевозка из дома в морг, из морга к месту прощания или на кладбище',
                'консультация агента и помощь с необходимыми документами',
                'перевозка сопровождающих вместе с умершим',
            ],
            useful: [
                'минимальная стоимость от 1 200 ₽ действует для перевозки из дома в морг',
                'цена зависит от расстояния, количества адресов, ожидания и времени подачи',
                'дополнительные остановки и дальнейший маршрут заранее включаем в смету',
                'принимаем заявки и выполняем перевозку круглосуточно',
            ],
        },
    },
    {
        anchor: 'Rail',
        name: 'Железнодорожная перевозка',
        price: 21_000,
        image: {
            src: '/rail-cargo.webp',
            alt: 'Багажный вагон для железнодорожной перевозки умершего в другой город',
            width: 1700,
            height: 830,
        },
        comparison: {
            geography: 'Любой город при наличии подходящего ж/д маршрута',
            roundTheClock: true,
            destinationMeeting: true,
            hearse: true,
            agentSupport: true,
            documents: 'Полное сопровождение',
            carrierCoordination: true,
            preparation: 'По требованиям перевозчика',
            zincContainer: 'Уточняется по маршруту',
            ticketsAndFees: 'В итоговой смете',
        },
        details: {
            included: [
                'встреча и доставка умершего в пунктах отправления и назначения',
                'консультация агента, подбор маршрута и оформление документов',
                'доставка катафалком из морга до железнодорожного вокзала',
                'согласование перевозки и требований железнодорожного перевозчика',
                'подготовка тела и транспортировочного комплекта по требованиям маршрута',
                'организация билетов, перевозочных сборов и получения в другом городе',
                'организация поездки сопровождающих',
            ],
            useful: [
                'железнодорожная перевозка возможна при наличии подходящего маршрута',
                'окончательная цена зависит от расстояния, расписания и условий перевозчика',
                'все билеты, сборы и услуги включаем в итоговую смету',
                toText([
                    'необходимость бальзамирования и цинкового контейнера уточняем',
                    'по правилам конкретного маршрута',
                ]),
            ],
        },
    },
    {
        anchor: 'Air',
        name: 'Авиаперевозка',
        price: 15_000,
        image: {
            src: '/air-cargo.webp',
            alt: 'Погрузка транспортировочного контейнера в самолет для перевозки умершего',
            width: 850,
            height: 500,
        },
        comparison: {
            geography: 'Города и регионы с подходящим авиамаршрутом',
            roundTheClock: true,
            destinationMeeting: true,
            hearse: true,
            agentSupport: true,
            documents: 'Полное сопровождение',
            carrierCoordination: true,
            preparation: 'По требованиям авиакомпании',
            zincContainer: 'По правилам авиакомпании',
            ticketsAndFees: 'В итоговой смете',
        },
        details: {
            included: [
                'встреча и доставка умершего в аэропортах отправления и назначения',
                'консультация агента, подбор рейса и оформление документов',
                'доставка катафалком из морга до грузового терминала аэропорта',
                'согласование перевозки и требований выбранной авиакомпании',
                'подготовка тела, гроба и транспортировочного комплекта',
                'организация билетов, терминальных и грузовых сборов',
                'организация получения и дальнейшей доставки в другом городе',
                'помощь с перелетом сопровождающих',
            ],
            useful: [
                'возможность отправки зависит от маршрута и правил авиакомпании',
                'окончательная цена зависит от направления, рейса, веса и сборов',
                'все билеты, терминальные и грузовые услуги включаем в итоговую смету',
                toText([
                    'справку о бальзамировании и цинковый контейнер готовим,',
                    'если их требует выбранный перевозчик',
                ]),
            ],
        },
    },
];
