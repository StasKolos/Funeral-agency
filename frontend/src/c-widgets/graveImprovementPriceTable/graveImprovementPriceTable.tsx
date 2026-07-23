import { formatGraveImprovementPrice } from '@/d-shared/data/graveImprovementItems';

import s from './graveImprovementPriceTable.module.scss';

const TITLE_ID = 'grave-improvement-price-title';
const DESCRIPTION_ID = 'grave-improvement-price-description';
const SCROLL_HINT_ID = 'grave-improvement-price-scroll-hint';

type PriceRow = {
    label: string;
    note: string;
    price: number;
    unit: string;
};

const priceRows: PriceRow[] = [
    {
        label: 'Укладка искусственного газона',
        price: 2_000,
        unit: 'м²',
        note: 'Без подготовки основания',
    },
    {
        label: 'Укладка брусчатки толщиной 30 мм',
        price: 2_000,
        unit: 'м²',
        note: 'Без подготовки основания',
    },
    {
        label: 'Укладка брусчатки толщиной 50 мм',
        price: 2_000,
        unit: 'м²',
        note: 'Без подготовки основания',
    },
    {
        label: 'Покраска памятника',
        price: 3_000,
        unit: 'услуга',
        note: 'После осмотра состояния поверхности',
    },
    {
        label: 'Покраска ограды',
        price: 4_000,
        unit: 'услуга',
        note: 'Цена зависит от размеров и подготовки металла',
    },
    {
        label: 'Демонтаж старой брусчатки',
        price: 6_000,
        unit: 'услуга',
        note: 'Вывоз материалов рассчитывается отдельно',
    },
    {
        label: 'Демонтаж старого монолитного пояса',
        price: 6_000,
        unit: 'услуга',
        note: 'Цена зависит от размеров и армирования',
    },
    {
        label: 'Облицовочная плитка из гранита',
        price: 6_000,
        unit: 'шт.',
        note: 'Итог зависит от размера и вида гранита',
    },
    {
        label: 'Отсыпка участка',
        price: 7_000,
        unit: 'участок',
        note: 'Материал и объем определяются после замеров',
    },
    {
        label: 'Установка стандартного памятника',
        price: 14_000,
        unit: 'услуга',
        note: 'Для памятников высотой 800–1000 мм',
    },
    {
        label: 'Установка семейного или высокого памятника',
        price: 15_000,
        unit: 'услуга',
        note: 'Для семейных памятников и стел от 1100 мм',
    },
    {
        label: 'Установка гранитной лавочки',
        price: 16_000,
        unit: 'услуга',
        note: 'Основание и доставка рассчитываются после осмотра',
    },
    {
        label: 'Монолитное основание 1,5 × 2 м',
        price: 18_000,
        unit: 'основание',
        note: 'Точный состав зависит от участка и грунта',
    },
    {
        label: 'Установка гранитного стола',
        price: 22_000,
        unit: 'услуга',
        note: 'Основание и доставка рассчитываются после осмотра',
    },
    {
        label: 'Монолитное основание от 2,5 × 2,5 м',
        price: 32_000,
        unit: 'основание',
        note: 'Стоимость увеличивается вместе с размером участка',
    },
];

const formatPrice = (price: number) => `от ${formatGraveImprovementPrice(price)} ₽`;

const GraveImprovementPriceTable = () => (
    <section
        aria-labelledby={TITLE_ID}
        className={s['wrapper']}
    >
        <h3 id={TITLE_ID}>Ориентировочные цены на работы</h3>
        <p
            className={s['description']}
            id={DESCRIPTION_ID}
        >
            Итоговая стоимость зависит от участка, материалов и объема работ. Точную смету
            составим после бесплатного выезда, консультации и замеров.
        </p>
        <p
            className={s['scroll-hint']}
            id={SCROLL_HINT_ID}
        >
            Прокрутите таблицу в сторону, чтобы увидеть все данные
        </p>
        <div
            aria-describedby={`${DESCRIPTION_ID} ${SCROLL_HINT_ID}`}
            aria-labelledby={TITLE_ID}
            className={s['scroll-container']}
            role={'region'}
            tabIndex={0}
        >
            <table className={s['table']}>
                <caption className={s['visually-hidden']}>
                    Ориентировочная стоимость работ по благоустройству мест захоронений
                </caption>
                <thead>
                    <tr>
                        <th scope={'col'}>Работа</th>
                        <th scope={'col'}>Цена</th>
                        <th scope={'col'}>Единица</th>
                        <th scope={'col'}>Примечание</th>
                    </tr>
                </thead>
                <tbody>
                    {priceRows.map((row) => (
                        <tr key={row.label}>
                            <th scope={'row'}>{row.label}</th>
                            <td>{formatPrice(row.price)}</td>
                            <td>{row.unit}</td>
                            <td>{row.note}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    </section>
);

export default GraveImprovementPriceTable;
