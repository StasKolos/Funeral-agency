'use client';

import clsx from 'clsx';
import Image from 'next/image';

import { stepsItems } from '@/d-shared/data/stepsItems';
import { useScrollAnimation } from '@/d-shared/hooks/useScrollAnimation';

import s from './steps.module.scss';

const Steps = () => {
    const listRef = useScrollAnimation<HTMLUListElement>(s['animated']);

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
                            className={s['item']}
                            key={item.frontText}
                        >
                            <span className={s['step-number']}>{index + 1}</span>
                            <div className={s['item-header']}>
                                <Image
                                    alt={item.img.alt}
                                    className={s['icon']}
                                    height={60}
                                    src={item.img.src}
                                    width={60}
                                />
                                <h3>{item.frontText}</h3>
                            </div>
                            <div className={s['divider']} />
                            <p>{item.backText}</p>
                        </li>
                    ))}
                </ul>
            </div>
        </section>
    );
};

export default Steps;
