'use client';

import { cremationItems } from '@/d-shared/data/cremationItems';
import { useScrollAnimation } from '@/d-shared/hooks/useScrollAnimation';
import classNames from 'classnames';
import Image from 'next/image';
import s from './cremationServices.module.scss';

const CremationServices = () => {
    const listRef = useScrollAnimation<HTMLUListElement>(s['animated']);

    return (
        <section id={'CremationServices'} className={classNames('section-wrapper', s['wrapper'])}>
            <div className={classNames('content-wrapper', 'content')}>
                <div className={'header'}>
                    <p>
                        Цены
                    </p>
                    <h2>
                        Кремация
                    </h2>
                </div>
                <ul
                    className={s['items']}
                    ref={listRef}
                >
                    {
                        cremationItems.map((item, index) => (
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
                                    {
                                        item.cost
                                        ? (
                                            <p>
                                                {`От ${item.cost} ₽`}
                                            </p>
                                        )
                                        : (
                                            <p>
                                                {item.free}
                                            </p>
                                        )
                                    }
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

export default CremationServices;
