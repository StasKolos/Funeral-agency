import classNames from 'classnames';
import Image from 'next/image';
import Link from 'next/link';
import Sidebar from './components/sidebar';
import s from './header.module.scss';

const Header = () => (
    <header className={s['header-wrapper']}>
        <div className={classNames(s['header'], 'content-wrapper')}>
            <Link
                href={'#Footer'}
            >
                <Image
                    width={120}
                    height={240}
                    src={'desktop-logo.svg'}
                    alt={'Логотип Ритуальные услуги'}
                    className={s['desktop-logo']}
                />
                <Image
                    width={80}
                    height={80}
                    src={'mobile-logo.svg'}
                    alt={'Логотип Ритуальные услуги'}
                    className={s['mobile-logo']}
                />
            </Link>
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
            <div className={s['contact-wrapper']}>
                <Link
                    href={'tel:+79625873238'}
                >
                    +7(962)587-32-38
                </Link>
                <p>
                    Работаем круглосуточно
                </p>
            </div>
            <Sidebar/>
        </div>
    </header>
);

export default Header;
