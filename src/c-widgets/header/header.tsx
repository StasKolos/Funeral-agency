import clsx from 'clsx';
import Image from 'next/image';
import Link from 'next/link';

import Sidebar from './components/sidebar';
import s from './header.module.scss';

const Header = () => (
    <header className={s['header-wrapper']}>
        <div className={clsx(s['header'], 'content-wrapper')}>
            <Link href={'#Footer'}>
                <Image
                    alt={'Логотип Грань ДВ'}
                    className={s['desktop-logo']}
                    height={240}
                    src={'desktop-logo.svg'}
                    width={120}
                />
                <Image
                    alt={'Логотип Грань ДВ'}
                    className={s['mobile-logo']}
                    height={80}
                    src={'mobile-logo.svg'}
                    width={80}
                />
            </Link>
            <nav className={s['navigation']}>
                <ul>
                    <li>
                        <Link href={'/'}>Главная</Link>
                    </li>
                    <li>
                        <Link href={'/services'}>Услуги</Link>
                    </li>
                    <li>
                        <Link href={'/products'}>Товары</Link>
                    </li>
                    <li>
                        <Link href={'/contacts'}>Контакты</Link>
                    </li>
                    <li>
                        <Link href={'/about'}>О нас</Link>
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
