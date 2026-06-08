import clsx from 'clsx';
import Image from 'next/image';
import Link from 'next/link';

import s from './contactUs.module.scss';

const ContactUs = () => (
    <section
        aria-labelledby={'contacts-title'}
        className={clsx('section-wrapper', s['wrapper'])}
        id={'ContactUs'}
    >
        <div className={clsx('content-wrapper', 'content')}>
            <div className={'header'}>
                <p>Мы на связи круглосуточно и поможем сориентироваться в первых шагах</p>
                <h2 id={'contacts-title'}>Контакты</h2>
            </div>
            <div className={s['info-wrapper']}>
                <p className={s['main-info']}>
                    В трудную минуту важно знать, что есть тот, к кому можно обратиться. Наша
                    команда дежурит без выходных и перерывов, чтобы в любой момент оказать вам
                    профессиональную помощь и поддержку.
                </p>
                <div className={s['phone-info']}>
                    <h4>Телефон для экстренных вызовов и консультаций:</h4>
                    <div className={s['phone-link']}>
                        <Link href={'tel:+79625873238'}>+7(962)587-32-38</Link>
                        <Image
                            alt={'Иконка клик по кнопке'}
                            height={30}
                            src={'/tap-click-icon.svg'}
                            width={30}
                        />
                    </div>
                    <p>
                        По этому номеру вы можете получить бесплатную консультацию, вызвать нашего
                        агента на дом или в морг, задать любой вопрос. Мы на связи всегда.
                    </p>
                </div>
                <div className={s['address-info']}>
                    <h4>Наш адрес для личного визита:</h4>
                    <div className={s['address-link']}>
                        <Link href={'#Footer'}>город Хабаровск, улица Карла Маркса, дом 176</Link>
                        <Image
                            alt={'Иконка клик по кнопке'}
                            height={30}
                            src={'/tap-click-icon.svg'}
                            width={30}
                        />
                    </div>
                    <p>
                        Если вам нужно встретиться с нашим менеджером лично, чтобы обсудить все
                        детали в спокойной обстановке, мы ждём вас по этому адресу.
                    </p>
                </div>
                <div className={s['schedule-info']}>
                    <h4>График работы офиса:</h4>
                    <p>Понедельник — воскресенье: с 9:00 до 18:00</p>
                    <p>
                        Круглосуточный телефон всегда активен. Если звоните ночью, не сомневайтесь —
                        мы обязательно ответим и поможем.
                    </p>
                </div>
            </div>
        </div>
    </section>
);

export default ContactUs;
