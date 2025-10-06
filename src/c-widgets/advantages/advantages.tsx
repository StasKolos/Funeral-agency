'use client';

import { advantagesItems } from '@/d-shared/data/advantagesItems';
import classNames from 'classnames';
import Image from 'next/image';
import { useEffect, useRef } from 'react';
import s from './advantages.module.scss';

const Advantages = () => {
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
                    <p>Приемущества</p>
                    <h2>Почему выбирают именно нас</h2>
                </div>
                <ul
                    className={s['items']}
                    ref={listRef}
                >
                    {advantagesItems.map((item, index) => (
                        <li
                            key={index}
                            className={s['item']}
                        >
                            <Image
                                width={60}
                                height={60}
                                src={item.img.src}
                                alt={item.img.alt}
                            />
                            <div className={s['divider']}/>
                            <p>
                                <span>{item.header}</span>
                                {item.text}
                            </p>
                        </li>
                    ))}
                </ul>
            </div>
        </section>
    );
};

export default Advantages;
