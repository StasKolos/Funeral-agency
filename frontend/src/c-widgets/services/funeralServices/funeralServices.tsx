'use client';

import clsx from 'clsx';
import Image from 'next/image';

import { funeralItems } from '@/d-shared/data/funeralItems';
import { useScrollAnimation } from '@/d-shared/hooks/useScrollAnimation';

import s from './funeralServices.module.scss';

const FuneralServices = () => {
    const listRef = useScrollAnimation<HTMLUListElement>(s['animated']);

    return (
        <section
            className={clsx('section-wrapper', s['wrapper'])}
            id={'FuneralServices'}
        >
            <div className={clsx('content-wrapper', 'content')}>
                <div className={'header'}>
                    <p>Цены</p>
                    <h2>Похороны</h2>
                </div>
                <ul
                    className={s['items']}
                    ref={listRef}
                >
                    {funeralItems.map((item, index) => (
                        <li
                            className={s['item']}
                            key={index}
                        >
                            <div className={s['item-info']}>
                                <h3>{item.name}</h3>
                                <Image
                                    alt={item.img.alt}
                                    className={s['icon']}
                                    height={150}
                                    src={item.img.src}
                                    width={150}
                                />
                                <p>{`От ${item.cost} ₽`}</p>
                                <ul>
                                    {item.list.map((listItem, index) => (
                                        <li key={index}>{listItem}</li>
                                    ))}
                                </ul>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        </section>
    );
};

export default FuneralServices;
