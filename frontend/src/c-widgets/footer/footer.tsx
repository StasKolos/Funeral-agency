import clsx from 'clsx';
import Image from 'next/image';
import Link from 'next/link';

import s from './footer.module.scss';

const OFFICE_2GIS_URL = 'https://2gis.ru/khabarovsk/firm/70000001101924571';
const OFFICE_MAP_FRAME_SRC =
    'https://www.openstreetmap.org/export/embed.html?bbox=135.135879%2C48.501446%2C135.139379%2C48.503646&layer=mapnik&marker=48.502546%2C135.137629';

const Footer = () => (
    <footer
        className={s['footer-wrapper']}
        id={'Footer'}
    >
        <div className={clsx(s['footer'], 'content-wrapper')}>
            <div className={s['background-opacity']} />
            <nav className={s['navigation']}>
                <ul>
                    <li>
                        <Link href={'/'}>Главная</Link>
                    </li>
                    <li>
                        <Link href={'/services#FuneralServices'}>Услуги</Link>
                    </li>
                    <li>
                        <Link href={'/products#Products'}>Товары</Link>
                    </li>
                    <li>
                        <Link href={'/contacts#ContactUs'}>Контакты</Link>
                    </li>
                    <li>
                        <Link href={'/about#AboutUs'}>О нас</Link>
                    </li>
                </ul>
            </nav>
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
                    <Link
                        href={OFFICE_2GIS_URL}
                        rel={'noopener noreferrer'}
                        target={'_blank'}
                    >
                        Карла Маркса, 176
                    </Link>
                </li>
            </ul>
            <div className={s['map-wrapper']}>
                <iframe
                    allowFullScreen
                    className={s['map']}
                    loading={'lazy'}
                    referrerPolicy={'no-referrer-when-downgrade'}
                    src={OFFICE_MAP_FRAME_SRC}
                    title={'Карта с адресом Грань ДВ'}
                ></iframe>
                <Link
                    className={s['map-link']}
                    href={OFFICE_2GIS_URL}
                    rel={'noopener noreferrer'}
                    target={'_blank'}
                >
                    Открыть в 2ГИС
                </Link>
            </div>
        </div>
    </footer>
);

export default Footer;
