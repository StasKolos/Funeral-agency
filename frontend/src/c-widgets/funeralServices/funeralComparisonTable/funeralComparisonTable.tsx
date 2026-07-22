import Link from 'next/link';

import {
    formatFuneralPackagePrice,
    funeralItems,
    type FuneralPackageComparison,
    type FuneralPackageComparisonValue,
} from '@/d-shared/data/funeralItems';
import { getProductCategoryPath } from '@/d-shared/products/productRoutes';

import s from './funeralComparisonTable.module.scss';

const TITLE_ID = 'funeral-comparison-title';
const SCROLL_HINT_ID = 'funeral-comparison-scroll-hint';

type ComparisonRow = {
    href?: string;
    key: keyof FuneralPackageComparison;
    label: string;
};

const comparisonRows: ComparisonRow[] = [
    {
        key: 'coffin',
        label: 'Гроб',
        href: `${getProductCategoryPath('COFFIN')}#Products`,
    },
    {
        key: 'monument',
        label: 'Памятник',
        href: `${getProductCategoryPath('MONUMENT')}#Products`,
    },
    { key: 'kit', label: 'Комплект', href: '/products#Products' },
    { key: 'team', label: 'Бригада' },
    { key: 'hearse', label: 'Катафалк' },
    { key: 'graveDigging', label: 'Копка могилы' },
    { key: 'ceremonySupport', label: 'Церемония и организация прощания' },
    { key: 'support', label: 'Помощь' },
];

const ComparisonValue = ({ value }: { value: FuneralPackageComparisonValue }) => {
    if (value === true) {
        return (
            <span
                aria-label={'Входит в тариф'}
                className={s['included']}
            >
                ✓
            </span>
        );
    }

    if (value === false) {
        return <span aria-label={'Не входит в тариф'}>-</span>;
    }

    return <>{value ?? 'Уточняется'}</>;
};

const FuneralComparisonTable = () => (
    <section
        aria-labelledby={TITLE_ID}
        className={s['wrapper']}
    >
        <h3 id={TITLE_ID}>Сравнение тарифов</h3>
        <p
            className={s['scroll-hint']}
            id={SCROLL_HINT_ID}
        >
            Проведите таблицу в сторону, чтобы увидеть все тарифы
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
                    Сравнение стоимости и состава тарифов на организацию похорон
                </caption>
                <thead>
                    <tr>
                        <th scope={'col'}>Опция</th>
                        {funeralItems.map((item) => (
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
                        {funeralItems.map((item) => (
                            <td key={item.anchor}>
                                {`От ${formatFuneralPackagePrice(item.price)} ₽`}
                            </td>
                        ))}
                    </tr>
                    {comparisonRows.map((row) => (
                        <tr key={row.key}>
                            <th scope={'row'}>
                                {row.href ? (
                                    <Link
                                        className={s['option-link']}
                                        href={row.href}
                                    >
                                        {row.label}
                                    </Link>
                                ) : (
                                    row.label
                                )}
                            </th>
                            {funeralItems.map((item) => (
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

export default FuneralComparisonTable;
