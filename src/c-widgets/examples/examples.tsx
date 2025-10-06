'use client';

import { examplesItems } from '@/d-shared/data/examplesItems';
import classNames from 'classnames';
import Image from 'next/image';
import Link from 'next/link';
import s from './examples.module.scss';
import { useEffect, useRef } from 'react';

const Examples = () => {
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
                        Примеры
                    </p>
                    <h2>
                        Наши работы
                    </h2>
                </div>
                <ul
                    className={s['items']}
                    ref={listRef}
                >
                    {
                        examplesItems.map(item => (
                            <li
                                key={item.id}
                                className={s['item']}
                            >
                                <Image
                                    width={30}
                                    height={30}
                                    src={'tap-click-icon.svg'}
                                    alt={'Иконка клик по кнопке'}
                                    className={s['tap-icon']}
                                />
                                <Link
                                    href={`examples-gallery/${item.id}`}
                                >
                                    <Image
                                        width={400}
                                        height={260}
                                        src={item.src}
                                        alt={item.alt}
                                        className={s['image']}
                                    />
                                </Link>
                            </li>
                        ))
                    }
                </ul>
            </div>
        </section>
    );
};

export default Examples;
