import {
    cremationItems,
    formatCremationOptionPrice,
    type CremationOptionComparison,
    type CremationOptionComparisonValue,
} from '@/d-shared/data/cremationItems';

import s from './cremationComparisonTable.module.scss';

const TITLE_ID = 'cremation-comparison-title';
const SCROLL_HINT_ID = 'cremation-comparison-scroll-hint';

type ComparisonRow = {
    key: keyof CremationOptionComparison;
    label: string;
};

const comparisonRows: ComparisonRow[] = [
    { key: 'conditions', label: 'Условия предоставления' },
    { key: 'cremation', label: 'Кремация' },
    { key: 'support', label: 'Помощь' },
    { key: 'coffin', label: 'Гроб' },
    { key: 'urn', label: 'Урна' },
    { key: 'hearse', label: 'Катафалк' },
    { key: 'team', label: 'Бригада' },
    { key: 'clothesTransfer', label: 'Передача вещей в морг' },
    { key: 'farewell', label: 'Организация прощания' },
    { key: 'urnGraveDigging', label: 'Копка могилы под урну' },
];

const ComparisonValue = ({ value }: { value: CremationOptionComparisonValue }) => {
    if (value === true) {
        return (
            <span
                aria-label={'Входит в вариант'}
                className={s['included']}
            >
                ✓
            </span>
        );
    }

    if (value === false) {
        return <span aria-label={'Не входит в вариант'}>-</span>;
    }

    return <>{value ?? 'Уточняется'}</>;
};

const CremationComparisonTable = () => (
    <section
        aria-labelledby={TITLE_ID}
        className={s['wrapper']}
    >
        <h3 id={TITLE_ID}>Сравнение вариантов кремации</h3>
        <p
            className={s['scroll-hint']}
            id={SCROLL_HINT_ID}
        >
            Прокрутите таблицу в сторону, чтобы увидеть оба варианта
        </p>
        <div
            aria-describedby={SCROLL_HINT_ID}
            aria-labelledby={TITLE_ID}
            className={s['scroll-container']}
            role={'region'}
            tabIndex={0}
        >
            <table className={s['table']}>
                <caption className={s['visually-hidden']}>
                    Сравнение стоимости, условий и состава вариантов кремации
                </caption>
                <thead>
                    <tr>
                        <th scope={'col'}>Опция</th>
                        {cremationItems.map((item) => (
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
                        {cremationItems.map((item) => (
                            <td key={item.anchor}>{formatCremationOptionPrice(item)}</td>
                        ))}
                    </tr>
                    {comparisonRows.map((row) => (
                        <tr key={row.key}>
                            <th scope={'row'}>{row.label}</th>
                            {cremationItems.map((item) => (
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

export default CremationComparisonTable;
