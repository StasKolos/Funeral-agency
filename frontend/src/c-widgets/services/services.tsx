'use client';

import clsx from 'clsx';
import Image from 'next/image';
import Link from 'next/link';

import { servicesItems } from '@/d-shared/data/servicesItems';
import { useScrollAnimation } from '@/d-shared/hooks/useScrollAnimation';

import s from './services.module.scss';

const Services = () => {
    const listRef = useScrollAnimation<HTMLUListElement>(s['animated']);

    return (
        <section
            className={clsx('section-wrapper', s['wrapper'])}
            id={'Services'}
        >
            <div className={clsx('content-wrapper', 'content')}>
                <div className={'header'}>
                    <p>Самые доступные цены в Хабаровске</p>
                    <h2>Услуги</h2>
                </div>
                <ul
                    className={s['items']}
                    ref={listRef}
                >
                    {servicesItems.map((item, index) => (
                        <li
                            className={s['item']}
                            key={index}
                        >
                            <div className={s['item-header']}>
                                <h3>{item.name}</h3>
                                <p>{`От ${item.cost} ₽`}</p>
                            </div>
                            <div className={s['item-content']}>
                                <Image
                                    alt={item.img.alt}
                                    className={s['image']}
                                    height={600}
                                    sizes={[
                                        '(max-width: 400px) calc(100vw - 88px)',
                                        '(max-width: 600px) calc(100vw - 128px)',
                                        '(max-width: 1100px) calc(100vw - 144px)',
                                        '420px',
                                    ].join(', ')}
                                    src={item.img.src}
                                    width={800}
                                />
                                <ul className={s['details']}>
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

export default Services;
