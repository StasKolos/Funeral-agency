'use client';

import clsx from 'clsx';
import Image from 'next/image';
import Link from 'next/link';

import { cremationItems } from '@/d-shared/data/cremationItems';
import { useScrollAnimation } from '@/d-shared/hooks/useScrollAnimation';

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
                    <p>Самые низкие цены в Хабаровске</p>
                    <h2>Кремация</h2>
                </div>
                <ul
                    className={s['items']}
                    ref={listRef}
                >
                    {cremationItems.map((item, index) => (
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
                                {item.cost ? <p>{`От ${item.cost} ₽`}</p> : <p>{item.free}</p>}
                                <ul>
                                    {item.list.map((listItem, index) => (
                                        <li key={index}>{listItem}</li>
                                    ))}
                                </ul>
                            </div>
                            <Link
                                className={s['button']}
                                href={item.button.href}
                            >
                                {item.button.name}
                            </Link>
                        </li>
                    ))}
                </ul>
            </div>
        </section>
    );
};

export default CremationServices;
