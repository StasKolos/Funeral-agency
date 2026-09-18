import s from './cart.module.scss';

const CartSkeletonCard = () => (
    <li
        aria-hidden={true}
        className={s['skeleton-item']}
    >
        <span className={s['skeleton-title']} />
        <span className={s['skeleton-image']} />
        <span className={s['skeleton-line']} />
        <span className={s['skeleton-quantity']} />
        <span className={s['skeleton-button']} />
    </li>
);

export default CartSkeletonCard;
