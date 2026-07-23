'use client';

import clsx from 'clsx';
import Image from 'next/image';
import Link from 'next/link';

import CargoComparisonTable from '@/c-widgets/cargoComparisonTable/cargoComparisonTable';
import { cargoItems, formatCargoOptionPrice } from '@/d-shared/data/cargoItems';
import { useScrollAnimation } from '@/d-shared/hooks/useScrollAnimation';

import s from './cargoServices.module.scss';

const CargoServices = () => {
    const listRef = useScrollAnimation<HTMLUListElement>(s['animated']);

    return (
        <section
            className={clsx('section-wrapper', s['wrapper'])}
            id={'CargoServices'}
        >
            <div className={clsx('content-wrapper', 'content')}>
                <div className={'header'}>
                    <p>Стоимость зависит от маршрута и вида транспорта</p>
                    <h2>Варианты перевозки умершего</h2>
                </div>
                <ul
                    className={s['items']}
                    ref={listRef}
                >
                    {cargoItems.map((item) => (
                        <li
                            className={s['item']}
                            id={item.anchor}
                            key={item.anchor}
                        >
                            <div className={s['item-header']}>
                                <h3>{item.name}</h3>
                                <p>{`От ${formatCargoOptionPrice(item.price)} ₽`}</p>
                            </div>
                            <div className={s['item-content']}>
                                <Image
                                    alt={item.image.alt}
                                    className={s['image']}
                                    height={item.image.height}
                                    sizes={[
                                        '(max-width: 400px) calc(100vw - 88px)',
                                        '(max-width: 600px) calc(100vw - 128px)',
                                        '(max-width: 1100px) calc(100vw - 144px)',
                                        '420px',
                                    ].join(', ')}
                                    src={item.image.src}
                                    width={item.image.width}
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
                <CargoComparisonTable />
            </div>
        </section>
    );
};

export default CargoServices;
