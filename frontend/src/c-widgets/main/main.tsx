import clsx from 'clsx';
import Image from 'next/image';
import Link from 'next/link';

import s from './main.module.scss';

const Main = () => (
    <section className={clsx('section-wrapper', s['main'])}>
        <div
            aria-hidden={true}
            className={s['background-opacity']}
        />
        <div className={clsx('content-wrapper', s['main-content'])}>
            <h1 className={s['info']}>
                ОРГАНИЗАЦИЯ ПОХОРОН, КРЕМАЦИЯ, ТРАНСПОРТИРОВКА ГРУЗА 200, ПЕРЕВОЗКА УМЕРШИХ 24/7.
                <br />
                БЛАГОУСТРОЙСТВО МЕСТ ЗАХОРОНЕНИЙ, ОКАЗАНИЕ РИТУАЛЬНЫХ УСЛУГ
                <span>
                    Мы проведём прощание с любовью и уважением, чтобы каждый момент отражал вашу
                    заботу о близком человеке. Нас выбирают по рекомендациям, доверяя организацию
                    достойных похорон.
                </span>
            </h1>
            <ul className={s['contacts']}>
                <li>
                    <Image
                        alt={'Иконка телефона'}
                        height={24}
                        src={'/phone-icon.svg'}
                        width={24}
                    />
                    <Link href={'tel:+79625873238'}>+7(962)587-32-38</Link>
                </li>
                <li>
                    <Image
                        alt={'Иконка WhatsApp'}
                        height={24}
                        src={'/whatsapp-icon.svg'}
                        width={24}
                    />
                    <Link href={'https://wa.me/+79625873238?text=Здравствуйте%2C'}>
                        +7(962)587-32-38
                    </Link>
                </li>
                <li>
                    <Image
                        alt={'Иконка Telegram'}
                        height={24}
                        src={'/telegram-icon.svg'}
                        width={24}
                    />
                    <Link href={'https://t.me/ritual_uslugi_khv'}>@ritual_uslugi_khv</Link>
                </li>
                <li>
                    <Image
                        alt={'Иконка Email'}
                        height={24}
                        src={'/email-icon.svg'}
                        width={24}
                    />
                    <Link href={'mailto:z-l00@bk.ru'}>z-l00@bk.ru</Link>
                </li>
                <li>
                    <Image
                        alt={'Иконка Локации'}
                        height={24}
                        src={'/location-icon.svg'}
                        width={24}
                    />
                    <Link href={'#Footer'}>Карла Маркса, 176</Link>
                </li>
            </ul>
        </div>
    </section>
);

export default Main;
