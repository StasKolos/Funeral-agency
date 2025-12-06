import clsx from 'clsx';
import Image from 'next/image';
import Link from 'next/link';
import s from './footer.module.scss';

const Footer = () => (
    <footer id={'Footer'} className={s['footer-wrapper']}>
        <div className={clsx(s['footer'], 'content-wrapper')}>
            <div className={s['background-opacity']}/>
            <nav className={s['navigation']}>
                <ul>
                    <li>
                        <Link
                            href={'/'}
                        >
                            Главная
                        </Link>
                    </li>
                    <li>
                        <Link
                            href={'/services'}
                        >
                            Услуги
                        </Link>
                    </li>
                    <li>
                        <Link
                            href={'/products'}
                        >
                            Товары
                        </Link>
                    </li>
                    <li>
                        <Link
                            href={'/contacts'}
                        >
                            Контакты
                        </Link>
                    </li>
                    <li>
                        <Link
                            href={'/about'}
                        >
                            О нас
                        </Link>
                    </li>
                </ul>
            </nav>
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
            <iframe
                width={'100%'}
                height={'400px'}
                src={'https://widgets.2gis.com/widget?type=firmsonmap&options=%7B%22pos%22%3A%7B%22lat%22%3A48.50439053030863%2C%22lon%22%3A135.13562536056273%2C%22zoom%22%3A16%7D%2C%22opt%22%3A%7B%22city%22%3A%22khabarovsk%22%7D%2C%22org%22%3A%2270000001101924571%22%7D'}
                className={s['map']}
            >
            </iframe>
        </div>
    </footer>
);

export default Footer;
