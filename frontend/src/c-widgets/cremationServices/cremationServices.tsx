'use client';

import clsx from 'clsx';
import Image from 'next/image';
import Link from 'next/link';

import {
    cremationItems,
    formatCremationOptionPrice,
} from '@/d-shared/data/cremationItems';
import { useScrollAnimation } from '@/d-shared/hooks/useScrollAnimation';

import CremationComparisonTable from './cremationComparisonTable/cremationComparisonTable';
import s from './cremationServices.module.scss';

const CremationServices = () => {
    const listRef = useScrollAnimation<HTMLUListElement>(s['animated']);

    return (
        <section
            className={clsx('section-wrapper', s['wrapper'])}
            id={'CremationServices'}
        >
            <div className={clsx('content-wrapper', 'content')}>
                <div className={'header'}>
                    <p>Стоимость организации кремации</p>
                    <h2>Варианты кремации</h2>
                </div>
                <ul
                    className={s['items']}
                    ref={listRef}
                >
                    {cremationItems.map((item) => (
                        <li
                            className={s['item']}
                            id={item.anchor}
                            key={item.anchor}
                        >
                            <div className={s['item-header']}>
                                <h3>{item.name}</h3>
                                <p>{formatCremationOptionPrice(item)}</p>
                            </div>
                            <div className={s['item-content']}>
                                <Image
                                    alt={item.image.alt}
                                    className={s['image']}
                                    height={600}
                                    sizes={[
                                        '(max-width: 400px) calc(100vw - 88px)',
                                        '(max-width: 600px) calc(100vw - 128px)',
                                        '(max-width: 1100px) calc(100vw - 144px)',
                                        '420px',
                                    ].join(', ')}
                                    src={item.image.src}
                                    width={800}
                                />
                                <div className={s['details']}>
                                    <article className={s['detail']}>
                                        <h4>Что входит</h4>
                                        <ul>
                                            {item.details.included.map((includedItem) => (
                                                <li key={includedItem}>{includedItem}</li>
                                            ))}
                                        </ul>
                                    </article>
                                    <article className={s['detail']}>
                                        <h4>Что важно знать</h4>
                                        <ul>
                                            {item.details.useful.map((usefulItem) => (
                                                <li key={usefulItem}>{usefulItem}</li>
                                            ))}
                                        </ul>
                                    </article>
                                </div>
                            </div>
                            <Link
                                className={s['button']}
                                href={'tel:+79625873238'}
                            >
                                Заказать
                            </Link>
                        </li>
                    ))}
                </ul>
                <CremationComparisonTable />
            </div>
        </section>
    );
};

export default CremationServices;
