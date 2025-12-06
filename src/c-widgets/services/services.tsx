'use client';

import { servicesItems } from '@/d-shared/data/servicesItems';
import { useScrollAnimation } from '@/d-shared/hooks/useScrollAnimation';
import clsx from 'clsx';
import Image from 'next/image';
import Link from 'next/link';
import s from './services.module.scss';

const Services = () => {
    const listRef = useScrollAnimation<HTMLUListElement>(s['animated']);

    return (
        <section className={clsx('section-wrapper', s['wrapper'])}>
            <div className={clsx('content-wrapper', 'content')}>
                <div className={'header'}>
                    <p>
                        Самые доступные цены в Хабаровске
                    </p>
                    <h2>
                        Грань ДВ
                    </h2>
                </div>
                <ul
                    className={s['items']}
                    ref={listRef}
                >
                    {
                        servicesItems.map((item, index) => (
                            <li
                                key={index}
                                className={s['item']}
                            >
                                <div className={s['item-info']}>
                                    <h3>
                                        {item.name}
                                    </h3>
                                    <Image
                                        width={150}
                                        height={150}
                                        src={item.img.src}
                                        alt={item.img.alt}
                                        className={s['icon']}
                                    />
                                    <p>
                                        {`От ${item.cost} ₽`}
                                    </p>
                                    <ul>
                                        {
                                            item.list.map((listItem, index) => (
                                                <li
                                                    key={index}
                                                >
                                                    {listItem}
                                                </li>
                                            ))
                                        }
                                    </ul>
                                </div>
                                {
                                    item.button &&
                                    <Link
                                        className={s['button']}
                                        href={item.button.href}
                                    >
                                        {item.button.name}
                                    </Link>
                                }
                            </li>
                        ))
                    }
                </ul>
            </div>
        </section>
    );
};

export default Services;
