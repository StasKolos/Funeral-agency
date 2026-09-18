import clsx from 'clsx';
import Image from 'next/image';
import Link from 'next/link';

import s from './feedback.module.scss';

const Feedback = () => (
    <section className={clsx('section-wrapper', s['wrapper'])}>
        <div className={clsx('content-wrapper', 'content')}>
            <div className={'header'}>
                <p>Мы рядом 24 часа в сутки</p>
                <h2>Свяжитесь с нами</h2>
            </div>
            <div className={s['info-wrapper']}>
                <p className={s['info']}>
                    Потеря близкого человека всегда приходит неожиданно, даже если казалось, что к
                    ней можно подготовиться. В первые минуты может наступить растерянность, шок или
                    полная апатия - и это совершенно естественно.
                    <br />
                    Главное - не оставаться один на один с горем. Попросите помощи у родных или
                    друзей - тех, кто сможет взять на себя организационные вопросы в этот момент. А
                    мы поможем со всем остальным: организуем всё необходимое с деликатностью,
                    уважением и вниманием к вашим чувствам.
                </p>
                <div className={s['buttons-wrapper']}>
                    <div className={s['button-wrapper']}>
                        <p>Напишите нам в WhatsApp.</p>
                        <Link
                            aria-label={'Написать нам в WhatsApp'}
                            className={s['button']}
                            href={'https://wa.me/79625873238?text=Здравствуйте%2C'}
                        >
                            <Image
                                alt={''}
                                aria-hidden={true}
                                height={30}
                                src={'/tap-click-icon.svg'}
                                width={30}
                            />
                            Написать нам
                        </Link>
                    </div>
                    <div className={s['button-wrapper']}>
                        <p>Позвоните нам.</p>
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
    </section>
);

export default Feedback;
