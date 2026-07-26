import {
    cargoItems,
    formatCargoOptionPrice,
    type CargoOptionComparison,
    type CargoOptionComparisonValue,
} from '@/d-shared/data/cargoItems';

import s from './cargoComparisonTable.module.scss';

const TITLE_ID = 'cargo-comparison-title';
const SCROLL_HINT_ID = 'cargo-comparison-scroll-hint';

type ComparisonRow = {
    key: keyof CargoOptionComparison;
    label: string;
};

const comparisonRows: ComparisonRow[] = [
    { key: 'geography', label: 'География перевозки' },
    { key: 'roundTheClock', label: 'Круглосуточно' },
    { key: 'destinationMeeting', label: 'Встреча и доставка умершего' },
    { key: 'hearse', label: 'Катафалк' },
    { key: 'agentSupport', label: 'Сопровождение агента' },
    { key: 'documents', label: 'Помощь с документами' },
    { key: 'carrierCoordination', label: 'Согласование с перевозчиком' },
    { key: 'preparation', label: 'Подготовка к перевозке' },
    { key: 'zincContainer', label: 'Цинковый контейнер' },
    { key: 'ticketsAndFees', label: 'Билеты и сборы' },
];

const ComparisonValue = ({ value }: { value: CargoOptionComparisonValue }) => {
    if (value === true) {
        return (
            <span
                aria-label={'Входит в услугу'}
                className={s['included']}
            >
                ✓
            </span>
        );
    }

    if (value === false) {
        return <span aria-label={'Не требуется или не применяется'}>-</span>;
    }

    return <>{value ?? 'Уточняется'}</>;
};

const CargoComparisonTable = () => (
    <section
        aria-labelledby={TITLE_ID}
        className={s['wrapper']}
    >
        <h3 id={TITLE_ID}>Сравнение вариантов перевозки</h3>
        <p
            className={s['description']}
            id={'cargo-comparison-description'}
        >
            Точный состав услуги зависит от маршрута и требований выбранного перевозчика.
            Все обязательные расходы заранее включим в итоговую смету.
        </p>
        <p
            className={s['scroll-hint']}
            id={SCROLL_HINT_ID}
        >
            Прокрутите таблицу в сторону, чтобы увидеть все варианты
        </p>
        <div
            aria-describedby={`cargo-comparison-description ${SCROLL_HINT_ID}`}
            aria-labelledby={TITLE_ID}
            className={s['scroll-container']}
            role={'region'}
            tabIndex={0}
        >
            <table className={s['table']}>
                <caption className={s['visually-hidden']}>
                    Сравнение стоимости и состава вариантов перевозки умершего
                </caption>
                <thead>
                    <tr>
                        <th scope={'col'}>Опция</th>
                        {cargoItems.map((item) => (
                            <th
                                key={item.anchor}
                                scope={'col'}
                            >
                                {item.name}
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <th scope={'row'}>Стоимость</th>
                        {cargoItems.map((item) => (
                            <td key={item.anchor}>
                                {`От ${formatCargoOptionPrice(item.price)} ₽`}
                            </td>
                        ))}
                    </tr>
                    {comparisonRows.map((row) => (
                        <tr key={row.key}>
                            <th scope={'row'}>{row.label}</th>
                            {cargoItems.map((item) => (
                                <td key={item.anchor}>
                                    <ComparisonValue value={item.comparison[row.key]} />
                                </td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    </section>
);

export default CargoComparisonTable;
