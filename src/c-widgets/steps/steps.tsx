'use client';

import { stepsItems } from '@/d-shared/data/stepsItems';
import { useScrollAnimation } from '@/d-shared/hooks/useScrollAnimation';
import clsx from 'clsx';
import Image from 'next/image';
import { Fragment, useState } from 'react';
import s from './steps.module.scss';

const Steps = () => {
    const listRef = useScrollAnimation<HTMLUListElement>(s['animated']);
    const [ flippedIndex, setFlippedIndex ] = useState<number | null>(null);

    const handleHoverCard = (index: number) => {
        setFlippedIndex(flippedIndex === index ? null : index);
    };

    return (
        <section className={clsx('section-wrapper', s['wrapper'])}>
            <div className={clsx('content-wrapper', 'content')}>
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

                                    className={clsx(
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
