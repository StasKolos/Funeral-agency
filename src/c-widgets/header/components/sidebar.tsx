'use client';

import clsx from 'clsx';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import s from '../header.module.scss';

const Sidebar = () => {
    const [ isOpen, setIsOpen ] = useState(false);

    const handleClick = () => setIsOpen(!isOpen);

    const handleCloseSidebar = () => setIsOpen(false);

    return (
        <>
            <button
                className={clsx(s['sidebar-button'], {
                    [s['sidebar-button--active']]: isOpen,
                })}
                onClick={handleClick}
            >
                <Image
                    width={30}
                    height={30}
                    src={'sidebar-icon.svg'}
                    alt={'Иконка бокового меню'}
                />
            </button>
            <div
                className={clsx(s['sidebar'], {
                    [s['sidebar--active']]: isOpen,
                })}
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
                                href={'/services'}
                                onClick={handleCloseSidebar}
                            >
                                Услуги
                            </Link>
                        </li>
                        <li>
                            <Link
                                href={'/products'}
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
                className={clsx(s['background-opacity'], {
                    [s['background-opacity--active']]: isOpen,
                })}
                onClick={handleClick}
            />
        </>
    );
};

export default Sidebar;
