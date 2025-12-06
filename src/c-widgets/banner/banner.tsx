import clsx from 'clsx';
import Image from 'next/image';
import s from './banner.module.scss';

const Banner = () => (
    <section className={clsx('section-wrapper', s['wrapper'])}>
        <Image
            width={100}
            height={100}
            src={'banner-icon.svg'}
            alt={'Иконка катафалк'}
        />
        <h2>Осуществляем бесплатную транспортировку в любой морг Хабаровска</h2>
    </section>
);

export default Banner;
