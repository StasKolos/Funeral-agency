'use client';

import clsx from 'clsx';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';

import {
    isServiceNavigationGroup,
    serviceNavigationItems,
} from '@/d-shared/data/serviceNavigationItems';

import s from './sidebar.module.scss';

const Sidebar = () => {
    const [isOpen, setIsOpen] = useState(false);

    const handleClick = () => setIsOpen(!isOpen);

    const handleCloseSidebar = () => setIsOpen(false);

    return (
        <>
            <button
                aria-controls={'mobile-sidebar'}
                aria-expanded={isOpen}
                aria-haspopup={'dialog'}
                aria-label={isOpen ? 'Закрыть меню' : 'Открыть меню'}
                className={clsx(s['sidebar-button'], {
                    [s['sidebar-button--active']]: isOpen,
                })}
                onClick={handleClick}
                type={'button'}
            >
                <Image
                    alt={'Иконка бокового меню'}
                    height={30}
                    src={'/sidebar-icon.svg'}
                    width={30}
                />
            </button>
            <div
                aria-hidden={!isOpen}
                aria-label={'Меню сайта'}
                aria-modal={isOpen}
                className={clsx(s['sidebar'], {
                    [s['sidebar--active']]: isOpen,
                })}
                id={'mobile-sidebar'}
                inert={!isOpen}
                role={'dialog'}
            >
                <nav
                    aria-label={'Навигация по сайту'}
                    className={s['sidebar-navigation']}
                >
                    <ul className={s['sidebar-navigation-list']}>
                        <li className={s['sidebar-navigation-item']}>
                            <Link
                                href={'/'}
                                onClick={handleCloseSidebar}
                            >
                                Главная
                            </Link>
                        </li>
                        <li className={s['sidebar-navigation-item']}>
                            <Link
                                href={'/about#AboutUs'}
                                onClick={handleCloseSidebar}
                            >
                                О нас
                            </Link>
                        </li>
                        <li className={s['sidebar-navigation-item']}>
                            <span className={s['sidebar-dropdown-title']}>Услуги</span>
                            <ul className={s['sidebar-dropdown-list']}>
                                {serviceNavigationItems.map((item) => {
                                    if (isServiceNavigationGroup(item)) {
                                        return (
                                            <li key={item.name}>
                                                <Link
                                                    className={s['sidebar-dropdown-title']}
                                                    href={item.href}
                                                    onClick={handleCloseSidebar}
                                                >
                                                    {item.name}
                                                </Link>
                                                <ul className={s['sidebar-dropdown-sublist']}>
                                                    {item.children.map((childItem) => (
                                                        <li key={childItem.href}>
                                                            <Link
                                                                href={childItem.href}
                                                                onClick={handleCloseSidebar}
                                                            >
                                                                {childItem.name}
                                                            </Link>
                                                        </li>
                                                    ))}
                                                </ul>
                                            </li>
                                        );
                                    }

                                    return (
                                        <li key={item.href}>
                                            <Link
                                                href={item.href}
                                                onClick={handleCloseSidebar}
                                            >
                                                {item.name}
                                            </Link>
                                        </li>
                                    );
                                })}
                            </ul>
                        </li>
                        <li className={s['sidebar-navigation-item']}>
                            <Link
                                href={'/products#Products'}
                                onClick={handleCloseSidebar}
                            >
                                Товары
                            </Link>
                        </li>
                        <li className={s['sidebar-navigation-item']}>
                            <Link
                                href={'/contacts#ContactUs'}
                                onClick={handleCloseSidebar}
                            >
                                Контакты
                            </Link>
                        </li>
                    </ul>
                </nav>
            </div>
            <div
                aria-hidden={true}
                className={clsx(s['background-opacity'], {
                    [s['background-opacity--active']]: isOpen,
                })}
                onClick={handleCloseSidebar}
            />
        </>
    );
};

export default Sidebar;
