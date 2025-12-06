'use client';

import { funeralItems } from '@/d-shared/data/funeralItems';
import { useScrollAnimation } from '@/d-shared/hooks/useScrollAnimation';
import clsx from 'clsx';
import Image from 'next/image';
import s from './funeralServices.module.scss';

const FuneralServices = () => {
    const listRef = useScrollAnimation<HTMLUListElement>(s['animated']);

    return (
        <section id={'FuneralServices'} className={clsx('section-wrapper', s['wrapper'])}>
            <div className={clsx('content-wrapper', 'content')}>
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
