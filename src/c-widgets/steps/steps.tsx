'use client';

import { stepsItems } from '@/d-shared/data/stepsItems';
import classNames from 'classnames';
import Image from 'next/image';
import { Fragment, useEffect, useRef, useState } from 'react';
import s from './steps.module.scss';

const Steps = () => {
    const [ flippedIndex, setFlippedIndex ] = useState<number | null>(null);

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

    const handleHoverCard = (index: number) => {
        setFlippedIndex(flippedIndex === index ? null : index);
    };

    return (
        <section className={classNames('section-wrapper', s['wrapper'])}>
            <div className={classNames('content-wrapper', 'content')}>
                <div className={'header'}>
                    <p>
                        Если умер близкий человек
                    </p>
                    <h2>
                        Важные шаги, которые помогут вам сейчас
                    </h2>
                </div>
                <ul
                    className={s['items']}
                    ref={listRef}
                >
                    {
                        stepsItems.map((item, index) => (
                            <Fragment
                                key={index}
                            >
                                <li

                                    className={classNames(
                                        s['item'],
                                        { [s['flipped']]: flippedIndex === index },
                                    )}
                                    onClick={() => handleHoverCard(index)}
                                >
                                    <div className={s['card-wrapper']}>
                                        <div className={s['card-front']}>
                                            <p>
                                                {`${index + 1}.`}
                                            </p>
                                            <Image
                                                width={30}
                                                height={30}
                                                src={'tap-click-icon.svg'}
                                                alt={'Иконка клик по кнопке'}
                                                className={s['tap-icon']}
                                            />
                                            <Image
                                                width={60}
                                                height={60}
                                                src={item.img.src}
                                                alt={item.img.alt}
                                            />
                                            <p>
                                                {item.frontText}
                                            </p>
                                        </div>
                                        <div className={s['card-back']}>
                                            <p>
                                                {item.backText}
                                            </p>
                                        </div>
                                    </div>
                                </li>
                            </Fragment>
                        ))
                    }
                </ul>
            </div>
        </section>
    );
};

export default Steps;
