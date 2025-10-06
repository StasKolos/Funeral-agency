'use client';

import { servicesItems } from '@/d-shared/data/servicesItems';
import classNames from 'classnames';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useRef } from 'react';
import s from './services.module.scss';

const Services = () => {
    const listRef = useRef<HTMLUListElement | null>(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            entries => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add(s['animated']);
                        observer.unobserve(entry.target);
                    }
                });
            },
            {
                threshold: 0.2,
                rootMargin: '0px 0px -50px 0px',
            },
        );

        if (listRef.current) {
            observer.observe(listRef.current);
        }

        return () => {
            if (listRef.current) {
                observer.unobserve(listRef.current);
            }
        };
    }, []);

    return (
        <section className={classNames('section-wrapper', s['wrapper'])}>
            <div className={classNames('content-wrapper', 'content')}>
                <div className={'header'}>
                    <p>
                        Самые доступные цены в Хабаровске
                    </p>
                    <h2>
                        Ритуальные услуги
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
