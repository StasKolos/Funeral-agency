import clsx from 'clsx';
import Image from 'next/image';
import Link from 'next/link';
import s from './main.module.scss';

const Main = () => (
    <section className={clsx('section-wrapper', s['main'])}>
        <div className={s['background-opacity']}/>
        <div className={clsx('content-wrapper', s['main-content'])}>
            <h1 className={s['info']}>
                ОРГАНИЗАЦИЯ ПОХОРОН, КРЕМАЦИЯ, ГРУЗ 200, ПЕРЕВОЗКА УМЕРШИХ 24/7.
                <br/>
                БЛАГОУСТРОЙСТВО МЕСТ ЗАХОРОНЕНИЙ, ОКАЗАНИЕ РИТУАЛЬНЫХ УСЛУГ
                <span>
                    Мы проведём прощание с любовью и уважением, чтобы каждый момент отражал вашу заботу о близком человеке.
                    Нас выбирают по рекомендациям, доверяя организацию достойных и трогательных похорон
                </span>
            </h1>
            <ul className={s['contacts']}>
                <li>
                    <Image
                        width={24}
                        height={24}
                        src={'phone-icon.svg'}
                        alt={'Иконка телефона'}
                    />
                    <Link
                        href={'tel:+79625873238'}
                    >
                        +7(962)587-32-38
                    </Link>
                </li>
                <li>
                    <Image
                        width={24}
                        height={24}
                        src={'whatsapp-icon.svg'}
                        alt={'Иконка WatsApp'}
                    />
                    <Link
                        href={'https://wa.me/+79625873238?text=Здравствуйте%2C'}
                    >
                        +7(962)587-32-38
                    </Link>
                </li>
                <li>
                    <Image
                        width={24}
                        height={24}
                        src={'telegram-icon.svg'}
                        alt={'Иконка Telegram'}
                    />
                    <Link
                        href={'https://t.me/ritual_uslugi_khv'}
                    >
                        @ritual_uslugi_khv
                    </Link>
                </li>
                <li>
                    <Image
                        width={24}
                        height={24}
                        src={'email-icon.svg'}
                        alt={'Иконка Email'}
                    />
                    <Link
                        href={'mailto:z-l00@bk.ru'}
                    >
                        z-l00@bk.ru
                    </Link>
                </li>
                <li>
                    <Image
                        width={24}
                        height={24}
                        src={'location-icon.svg'}
                        alt={'Иконка Локации'}
                    />
                    <Link
                        href={'#Footer'}
                    >
                        Карла Маркса 176
                    </Link>
                </li>
            </ul>
        </div>
    </section>
);

export default Main;
