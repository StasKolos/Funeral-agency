import clsx from 'clsx';
import Image from 'next/image';
import Link from 'next/link';

import ServicesDropdown from './components/servicesDropdown';
import Sidebar from './components/sidebar';
import s from './header.module.scss';

const Header = () => (
    <header className={s['header-wrapper']}>
        <div className={clsx(s['header'], 'content-wrapper')}>
            <Link
                aria-label={'Перейти к контактной информации'}
                href={'#Footer'}
            >
                <Image
                    alt={'Логотип Грань ДВ'}
                    className={s['desktop-logo']}
                    height={240}
                    src={'/desktop-logo.svg'}
                    width={120}
                />
                <Image
                    alt={'Логотип Грань ДВ'}
                    className={s['mobile-logo']}
                    height={80}
                    src={'/mobile-logo.svg'}
                    width={80}
                />
            </Link>
            <nav
                aria-label={'Основная навигация'}
                className={s['navigation']}
            >
                <ul className={s['navigation-list']}>
                    <li className={s['navigation-item']}>
                        <Link href={'/'}>Главная</Link>
                    </li>
                    <li className={s['navigation-item']}>
                        <ServicesDropdown />
                    </li>
                    <li className={s['navigation-item']}>
                        <Link href={'/products#Products'}>Товары</Link>
                    </li>
                    <li className={s['navigation-item']}>
                        <Link href={'/contacts#ContactUs'}>Контакты</Link>
                    </li>
                    <li className={s['navigation-item']}>
                        <Link href={'/about#AboutUs'}>О нас</Link>
                    </li>
                </ul>
            </nav>
            <div className={s['contact-wrapper']}>
                <Link href={'tel:+79625873238'}>+7(962)587-32-38</Link>
                <p>Работаем круглосуточно</p>
            </div>
            <Sidebar />
        </div>
    </header>
);

export default Header;
