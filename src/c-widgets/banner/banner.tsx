import classNames from 'classnames';
import Image from 'next/image';
import s from './banner.module.scss';

const Banner = () => (
    <section className={classNames('section-wrapper', s['wrapper'])}>
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
