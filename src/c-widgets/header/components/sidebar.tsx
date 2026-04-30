'use client';

import clsx from 'clsx';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';

import s from '../header.module.scss';

const Sidebar = () => {
    const [isOpen, setIsOpen] = useState(false);

    const handleClick = () => setIsOpen(!isOpen);

    const handleCloseSidebar = () => setIsOpen(false);

    return (
        <>
            <button
                aria-controls={'mobile-sidebar'}
                aria-expanded={isOpen}
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
                    src={'sidebar-icon.svg'}
                    width={30}
                />
            </button>
            <div
                className={clsx(s['sidebar'], {
                    [s['sidebar--active']]: isOpen,
                })}
                id={'mobile-sidebar'}
            >
                <nav className={s['sidebar-navigation']}>
                    <ul>
                        <li>
                            <Link
                                href={'/'}
                                onClick={handleCloseSidebar}
                            >
                                Главная
                            </Link>
                        </li>
                        <li>
                            <Link
                                href={'/about#AboutUs'}
                                onClick={handleCloseSidebar}
                            >
                                О нас
                            </Link>
                        </li>
                        <li>
                            <Link
                                href={'/services#FuneralServices'}
                                onClick={handleCloseSidebar}
                            >
                                Услуги
                            </Link>
                        </li>
                        <li>
                            <Link
                                href={'/products#Products'}
                                onClick={handleCloseSidebar}
                            >
                                Товары
                            </Link>
                        </li>
                        <li>
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
