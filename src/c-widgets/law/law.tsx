import clsx from 'clsx';
import s from './law.module.scss';

const Law = () => (
    <section className={clsx('section-wrapper', s['wrapper'])}>
        <div className={clsx('content-wrapper', 'content')}>
            <div className={'header'}>
                <p>
                    Работаем в соответствии с Федеральным законом
                </p>
                <h2>
                    Мы выполняем свою работу с соблюдением Федерального закона №8-ФЗ
                    <br/>
                    «О погребении и похоронном деле» и доступны для заказчиков 24 часа в сутки.
                </h2>
            </div>
            <div className={s['info']}>
                <h3>Производим захоронения за счёт бюджета и ведомств следующих категорий граждан:</h3>
                <ul className={s['info-items']}>
                    <li>Участники ВОВ</li>
                    <li>Военнослужащие</li>
                    <li>Участники боевых действий</li>
                    <li>Ветераны военной службы</li>
                    <li>Пенсионеры МО, УВД, ФСБ, ФСО</li>
                    <li>Реабилитированные</li>
                </ul>
            </div>
        </div>
    </section>
);

export default Law;
