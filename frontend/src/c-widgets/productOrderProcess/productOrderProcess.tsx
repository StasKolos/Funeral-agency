import clsx from 'clsx';

import s from './productOrderProcess.module.scss';

const ProductOrderProcess = () => (
    <section
        aria-labelledby={'product-order-process-title'}
        className={clsx('section-wrapper', s['wrapper'])}
    >
        <div className={clsx('content-wrapper', 'content')}>
            <div className={'header'}>
                <p>Выберите товары и отправьте заявку</p>
                <h2 id={'product-order-process-title'}>Как оформить заказ</h2>
            </div>
            <ol className={s['steps']}>
                <li>
                    <strong>Выберите товар.</strong> Изучите фотографии, артикул и цену в карточке
                    подходящей модели.
                </li>
                <li>
                    <strong>Добавьте его в корзину.</strong> Нажмите кнопку «В корзину» на карточке.
                    Таким же способом можно добавить несколько необходимых товаров.
                </li>
                <li>
                    <strong>Проверьте заказ.</strong> Откройте страницу корзины и убедитесь, что в
                    списке находятся все выбранные позиции.
                </li>
                <li>
                    <strong>Укажите контактные данные.</strong> Заполните имя и номер телефона.
                    Электронную почту можно указать по желанию.
                </li>
                <li>
                    <strong>Отправьте заказ.</strong> Нажмите «Оформить заказ». Заявка поступит нам
                    на почту, и специалист свяжется с вами для подтверждения наличия, стоимости и
                    остальных деталей.
                </li>
            </ol>
        </div>
    </section>
);

export default ProductOrderProcess;
