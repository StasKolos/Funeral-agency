import clsx from 'clsx';

import s from './productCard/productCard.module.scss';

type ProductSkeletonCardProps = {
    isCoffinItems: boolean;
};

const ProductSkeletonCard = ({ isCoffinItems }: ProductSkeletonCardProps) => (
    <li
        aria-hidden={true}
        className={clsx(s['item'], s['skeleton-item'], {
            [s['coffin-item']]: isCoffinItems,
        })}
    >
        <span className={s['skeleton-title']} />
        <span className={clsx(s['image-wrapper'], s['skeleton-image-wrapper'])}>
            <span className={s['skeleton-image']} />
        </span>
        <span className={s['skeleton-price']} />
        <span className={s['skeleton-button']} />
    </li>
);

export default ProductSkeletonCard;
