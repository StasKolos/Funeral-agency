'use client';

import { examplesItems } from '@/d-shared/data/examplesItems';
import { useScrollAnimation } from '@/d-shared/hooks/useScrollAnimation';
import { Fancybox } from '@fancyapps/ui';
import '@fancyapps/ui/dist/fancybox/fancybox.css';
import clsx from 'clsx';
import Image from 'next/image';
import s from './examples.module.scss';

const Examples = () => {
    const listRef = useScrollAnimation<HTMLUListElement>(s['animated']);

    const openImageGallery = (index: number) => {
        const reworkeditems = examplesItems.map(item => ({
            src: item.src,
            type: 'image',
            caption: item.alt,
        }));

        Fancybox.show(reworkeditems, {
            startIndex: index,
            Carousel: {
                Thumbs: {
                    type: 'classic',
                },
                Zoomable: {
                    Panzoom: {
                        startPos: {
                            x: 0,
                            y: 0,
                            scale: 0.8,
                        },
                        minScale: 0.5,
                        maxScale: 2,
                    },
                },
                Toolbar: {
                    enabled: true,
                    display: {
                        left: [ 'infobar' ],
                        middle: [],
                        right: [ 'zoomIn', 'zoomOut', 'toggle1to1', 'thumbs', 'close' ],
                    },
                },
            },
        });
    };

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
                        examplesItems.map((item, index) => (
                            <li
                                key={index}
                                onClick={() => openImageGallery(index)}
                                className={s['item']}
                            >
                                <Image
                                    width={30}
                                    height={30}
                                    src={'tap-click-icon.svg'}
                                    alt={'Иконка клик по кнопке'}
                                    className={s['tap-icon']}
                                />
                                <Image
                                    width={400}
                                    height={260}
                                    src={item.src}
                                    alt={item.alt}
                                    className={s['image']}
                                />
                            </li>
                        ))
                    }
                </ul>
            </div>
        </section>
    );
};

export default Examples;
