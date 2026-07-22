'use client';

import Link from 'next/link';
import { MouseEvent, useEffect, useRef, useState } from 'react';

import {
    isServiceNavigationGroup,
    serviceNavigationItems,
} from '@/d-shared/data/serviceNavigationItems';

import s from './servicesDropdown.module.scss';

const ServicesDropdown = () => {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    const handleToggle = () => setIsOpen((currentValue) => !currentValue);

    const handleClose = () => setIsOpen(false);

    const handleDropdownClick = (event: MouseEvent<HTMLUListElement>) => {
        if (!(event.target instanceof Element)) return;

        const link = event.target.closest('a');

        if (link) handleClose();
    };

    useEffect(() => {
        const handlePointerDown = (event: PointerEvent) => {
            const dropdown = dropdownRef.current;

            if (!dropdown || dropdown.contains(event.target as Node)) return;

            handleClose();
        };

        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.key !== 'Escape') return;

            handleClose();
        };

        document.addEventListener('pointerdown', handlePointerDown);
        document.addEventListener('keydown', handleKeyDown);

        return () => {
            document.removeEventListener('pointerdown', handlePointerDown);
            document.removeEventListener('keydown', handleKeyDown);
        };
    }, []);

    return (
        <div
            className={s['navigation-dropdown']}
            ref={dropdownRef}
        >
            <button
                aria-controls={'services-dropdown'}
                aria-expanded={isOpen}
                aria-haspopup={'true'}
                className={s['navigation-dropdown-button']}
                onClick={handleToggle}
                type={'button'}
            >
                Услуги
            </button>
            {isOpen && (
                <ul
                    className={s['navigation-dropdown-list']}
                    id={'services-dropdown'}
                    onClick={handleDropdownClick}
                >
                    {serviceNavigationItems.map((item) => {
                        if (isServiceNavigationGroup(item)) {
                            return (
                                <li key={item.name}>
                                    <Link
                                        className={s['navigation-dropdown-link']}
                                        href={item.href}
                                        onClick={handleClose}
                                    >
                                        {item.name}
                                    </Link>
                                    <ul className={s['navigation-dropdown-sublist']}>
                                        {item.children.map((childItem) => (
                                            <li key={childItem.href}>
                                                <Link
                                                    href={childItem.href}
                                                    onClick={handleClose}
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
                                    className={s['navigation-dropdown-link']}
                                    href={item.href}
                                    onClick={handleClose}
                                >
                                    {item.name}
                                </Link>
                            </li>
                        );
                    })}
                </ul>
            )}
        </div>
    );
};

export default ServicesDropdown;
