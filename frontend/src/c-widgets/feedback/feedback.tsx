'use client';

import clsx from 'clsx';
import dynamic from 'next/dynamic';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';

import s from './feedback.module.scss';

const FeedbackModal = dynamic(() => import('./feedbackModal/feedbackModal'), { ssr: false });

const Feedback = () => {
    const [modalIsOpen, setModalIsOpen] = useState<boolean>(false);

    const handleOpenModal = () => setModalIsOpen(true);

    const handleCloseModal = () => setModalIsOpen(false);

    return (
        <section className={clsx('section-wrapper', s['wrapper'])}>
            <div className={clsx('content-wrapper', 'content')}>
                <div className={'header'}>
                    <p>Мы рядом 24 часа в сутки</p>
                    <h2>Свяжитесь с нами</h2>
                </div>
                <div className={s['info-wrapper']}>
                    <p className={s['info']}>
                        Потеря близкого человека всегда приходит неожиданно, даже если казалось, что
                        к ней можно подготовиться. В первые минуты может наступить растерянность,
                        шок или полная апатия — и это совершенно естественно.
                        <br />
                        Главное — не оставаться один на один с горем. Попросите помощи у родных или
                        друзей — тех, кто сможет взять на себя организационные вопросы в этот
                        момент. А мы поможем со всем остальным: организуем всё необходимое с
                        деликатностью, уважением и вниманием к вашим чувствам.
                    </p>
                    <div className={s['buttons-wrapper']}>
                        <div className={s['button-wrapper']}>
                            <p>Задайте вопрос — мы вам перезвоним!</p>
                            <button
                                className={s['button']}
                                onClick={handleOpenModal}
                                type={'button'}
                            >
                                <Image
                                    alt={'Иконка клик по кнопке'}
                                    height={30}
                                    src={'/tap-click-icon.svg'}
                                    width={30}
                                />
                                Написать нам
                            </button>
                        </div>
                        <div className={s['button-wrapper']}>
                            <p>Либо позвоните нам.</p>
                            <Link
                                className={s['button']}
                                href={'tel:+79625873238'}
                            >
                                <Image
                                    alt={'Иконка клик по кнопке'}
                                    height={30}
                                    src={'/tap-click-icon.svg'}
                                    width={30}
                                />
                                +7 (962) 587-32-38
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
            {modalIsOpen && (
                <FeedbackModal
                    handleClose={handleCloseModal}
                    isOpen={modalIsOpen}
                />
            )}
        </section>
    );
};

export default Feedback;
