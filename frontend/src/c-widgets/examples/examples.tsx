'use client';

import clsx from 'clsx';
import Image from 'next/image';
import { type KeyboardEvent } from 'react';

import { examplesItems } from '@/d-shared/data/examplesItems';
import { useScrollAnimation } from '@/d-shared/hooks/useScrollAnimation';
import ImageWithSkeleton from '@/d-shared/ui/imageWithSkeleton/imageWithSkeleton';
import { openImageGallery } from '@/d-shared/utils/openImageGallery';

import s from './examples.module.scss';

const EXAMPLE_IMAGE_SIZES =
    '(max-width: 500px) 140px, (max-width: 700px) 200px, (max-width: 1000px) 300px, 400px';

const Examples = () => {
    const listRef = useScrollAnimation<HTMLUListElement>(s['animated']);

    const handleOpenImageGallery = (index: number) => {
        openImageGallery(examplesItems, index);
    };

    const handleGalleryKeyDown = (event: KeyboardEvent<HTMLLIElement>, index: number) => {
        if (event.key !== 'Enter' && event.key !== ' ') return;

        event.preventDefault();
        handleOpenImageGallery(index);
    };

    return (
        <section className={clsx('section-wrapper', s['wrapper'])}>
            <div className={clsx('content-wrapper', 'content')}>
                <div className={'header'}>
                    <p>Примеры</p>
                    <h2>Наши работы</h2>
                </div>
                <ul
                    className={s['items']}
                    ref={listRef}
                >
                    {examplesItems.map((item, index) => (
                        <li
                            className={s['item']}
                            key={item.src}
                            onClick={() => handleOpenImageGallery(index)}
                            onKeyDown={(event) => handleGalleryKeyDown(event, index)}
                            role={'button'}
                            tabIndex={0}
                        >
                            <Image
                                alt={'Иконка клик по кнопке'}
                                className={s['tap-icon']}
                                height={30}
                                src={'/tap-click-icon.svg'}
                                width={30}
                            />
                            <ImageWithSkeleton
                                alt={item.alt}
                                className={s['image']}
                                height={260}
                                sizes={EXAMPLE_IMAGE_SIZES}
                                src={item.src}
                                width={400}
                                wrapperClassName={s['image-wrapper']}
                            />
                        </li>
                    ))}
                </ul>
            </div>
        </section>
    );
};

export default Examples;
