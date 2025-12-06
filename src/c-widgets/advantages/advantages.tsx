'use client';

import { advantagesItems } from '@/d-shared/data/advantagesItems';
import { useScrollAnimation } from '@/d-shared/hooks/useScrollAnimation';
import clsx from 'clsx';
import Image from 'next/image';
import s from './advantages.module.scss';

const Advantages = () => {
    const listRef = useScrollAnimation<HTMLUListElement>(s['animated']);

    return (
        <section className={clsx('section-wrapper', s['wrapper'])}>
            <div className={clsx('content-wrapper', 'content')}>
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
