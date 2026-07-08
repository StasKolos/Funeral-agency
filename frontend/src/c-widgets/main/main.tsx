import clsx from 'clsx';
import Image from 'next/image';
import Link from 'next/link';

import { inlineText } from '@/d-shared/utils/inlineText';

import s from './main.module.scss';

export const DEFAULT_MAIN_HEADER = inlineText`
    ОРГАНИЗАЦИЯ ПОХОРОН, КРЕМАЦИЯ, ТРАНСПОРТИРОВКА ТЕЛА УМЕРШЕГО, ПЕРЕВОЗКА УМЕРШИХ 24/7,
    БЛАГОУСТРОЙСТВО МЕСТ ЗАХОРОНЕНИЙ, ОКАЗАНИЕ РИТУАЛЬНЫХ УСЛУГ
`;

export const DEFAULT_MAIN_DESCRIPTION = inlineText`
    Мы проведём прощание с любовью и уважением, чтобы каждый момент отражал вашу заботу
    о близком человеке. Нас выбирают по рекомендациям, доверяя организацию достойных похорон.
`;

type MainProps = {
    description?: string | undefined;
    header?: string | undefined;
};

const Main = ({
    description = DEFAULT_MAIN_DESCRIPTION,
    header = DEFAULT_MAIN_HEADER,
}: MainProps) => (
    <section className={clsx('section-wrapper', s['main'])}>
        <div
            aria-hidden={true}
            className={s['background-opacity']}
        />
        <div className={clsx('content-wrapper', s['main-content'])}>
            <div className={s['info']}>
                <h1>{header}</h1>
                <span>{description}</span>
            </div>
            <ul className={s['contacts']}>
                <li>
                    <Image
                        alt={'Иконка телефона'}
                        height={24}
                        src={'/phone-icon.svg'}
                        width={24}
                    />
                    <Link href={'tel:+79625873238'}>+7(962)587-32-38</Link>
                </li>
                <li>
                    <Image
                        alt={'Иконка WhatsApp'}
                        height={24}
                        src={'/whatsapp-icon.svg'}
                        width={24}
                    />
                    <Link href={'https://wa.me/+79625873238?text=Здравствуйте%2C'}>
                        +7(962)587-32-38
                    </Link>
                </li>
                <li>
                    <Image
                        alt={'Иконка Telegram'}
                        height={24}
                        src={'/telegram-icon.svg'}
                        width={24}
                    />
                    <Link href={'https://t.me/ritual_uslugi_khv'}>@ritual_uslugi_khv</Link>
                </li>
                <li>
                    <Image
                        alt={'Иконка Email'}
                        height={24}
                        src={'/email-icon.svg'}
                        width={24}
                    />
                    <Link href={'mailto:z-l00@bk.ru'}>z-l00@bk.ru</Link>
                </li>
                <li>
                    <Image
                        alt={'Иконка Локации'}
                        height={24}
                        src={'/location-icon.svg'}
                        width={24}
                    />
                    <Link href={'#Footer'}>Карла Маркса, 176</Link>
                </li>
            </ul>
        </div>
    </section>
);

export default Main;
