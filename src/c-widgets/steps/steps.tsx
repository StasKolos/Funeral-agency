'use client';

import clsx from 'clsx';
import Image from 'next/image';
import { type KeyboardEvent, useState } from 'react';

import { stepsItems } from '@/d-shared/data/stepsItems';
import { useScrollAnimation } from '@/d-shared/hooks/useScrollAnimation';

import s from './steps.module.scss';

const Steps = () => {
    const listRef = useScrollAnimation<HTMLUListElement>(s['animated']);
    const [flippedIndex, setFlippedIndex] = useState<number | null>(null);

    const handleToggleCard = (index: number) => {
        setFlippedIndex(flippedIndex === index ? null : index);
    };

    const handleCardKeyDown = (event: KeyboardEvent<HTMLLIElement>, index: number) => {
        if (event.key !== 'Enter' && event.key !== ' ') return;

        event.preventDefault();
        handleToggleCard(index);
    };

    return (
        <section className={clsx('section-wrapper', s['wrapper'])}>
            <div className={clsx('content-wrapper', 'content')}>
                <div className={'header'}>
                    <p>Если умер близкий человек</p>
                    <h2>Важные шаги, которые помогут вам сейчас</h2>
                </div>
                <ul
                    className={s['items']}
                    ref={listRef}
                >
                    {stepsItems.map((item, index) => (
                        <li
                            className={clsx(s['item'], { [s['flipped']]: flippedIndex === index })}
                            key={item.frontText}
                            onClick={() => handleToggleCard(index)}
                            onKeyDown={(event) => handleCardKeyDown(event, index)}
                            role={'button'}
                            tabIndex={0}
                        >
                            <div className={s['card-wrapper']}>
                                <div className={s['card-front']}>
                                    <p>{`${index + 1}.`}</p>
                                    <Image
                                        alt={'Иконка клик по кнопке'}
                                        className={s['tap-icon']}
                                        height={30}
                                        src={'tap-click-icon.svg'}
                                        width={30}
                                    />
                                    <Image
                                        alt={item.img.alt}
                                        height={60}
                                        src={item.img.src}
                                        width={60}
                                    />
                                    <p>{item.frontText}</p>
                                </div>
                                <div className={s['card-back']}>
                                    <p>{item.backText}</p>
                                </div>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        </section>
    );
};

export default Steps;
