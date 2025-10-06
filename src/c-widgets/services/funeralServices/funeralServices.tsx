'use client';

import { funeralItems } from '@/d-shared/data/funeralItems';
import classNames from 'classnames';
import Image from 'next/image';
import s from './funeralServices.module.scss';
import { useEffect, useRef } from 'react';

const FuneralServices = () => {
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
        <section id={'FuneralServices'} className={classNames('section-wrapper', s['wrapper'])}>
            <div className={classNames('content-wrapper', 'content')}>
                <div className={'header'}>
                    <p>
                        Цены
                    </p>
                    <h2>
                        Похороны
                    </h2>
                </div>
                <ul
                    className={s['items']}
                    ref={listRef}
                >
                    {
                        funeralItems.map((item, index) => (
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
                            </li>
                        ))
                    }
                </ul>
            </div>
        </section>
    );
};

export default FuneralServices;
