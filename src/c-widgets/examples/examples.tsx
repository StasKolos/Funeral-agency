'use client';

import { examplesItems } from '@/d-shared/data/examplesItems';
import { useScrollAnimation } from '@/d-shared/hooks/useScrollAnimation';
import clsx from 'clsx';
import Image from 'next/image';
import Link from 'next/link';
import s from './examples.module.scss';

const Examples = () => {
    const listRef = useScrollAnimation<HTMLUListElement>(s['animated']);

    return (
        <section className={clsx('section-wrapper', s['wrapper'])}>
            <div className={clsx('content-wrapper', 'content')}>
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
