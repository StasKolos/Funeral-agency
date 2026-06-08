'use client';

import clsx from 'clsx';
import Image from 'next/image';

import { useScrollAnimation } from '@/d-shared/hooks/useScrollAnimation';

import s from './banner.module.scss';

const Banner = () => {
    const bannerRef = useScrollAnimation<HTMLElement>(s['animated']);

    return (
        <section
            className={clsx('section-wrapper', s['wrapper'])}
            ref={bannerRef}
        >
            <div className={s['content']}>
                <Image
                    alt={'Иконка катафалк'}
                    className={s['vehicle']}
                    height={100}
                    src={'/banner-icon.svg'}
                    width={100}
                />
                <h2>Осуществляем бесплатную транспортировку в любой морг Хабаровска</h2>
            </div>
        </section>
    );
};

export default Banner;
