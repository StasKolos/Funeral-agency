import clsx from 'clsx';
import Link from 'next/link';

import type {
    ProductCategoryDetails as ProductCategoryDetailsData,
    ProductCategoryTextPart,
} from '@/d-shared/products/productCategoryDetails';

import s from './productCategoryDetails.module.scss';

type ProductCategoryDetailsProps = {
    details: ProductCategoryDetailsData;
};

type RichTextProps = {
    parts: ProductCategoryTextPart[];
};

const RichText = ({ parts }: RichTextProps) => (
    <>
        {parts.map((part) =>
            part.href ? (
                <Link
                    href={part.href}
                    key={`${part.href}-${part.text}`}
                >
                    {part.text}
                </Link>
            ) : (
                part.text
            ),
        )}
    </>
);

const ProductCategoryDetails = ({ details }: ProductCategoryDetailsProps) => (
    <section
        aria-labelledby={'product-category-details-title'}
        className={clsx('section-wrapper', s['wrapper'])}
    >
        <div className={clsx('content-wrapper', 'content')}>
            <div className={'header'}>
                <p>{details.eyebrow}</p>
                <h2 id={'product-category-details-title'}>{details.title}</h2>
            </div>
            <div className={s['description']}>
                {details.paragraphs.map((paragraph) => (
                    <p key={paragraph.map((part) => part.text).join('')}>
                        <RichText parts={paragraph} />
                    </p>
                ))}
            </div>
            <article className={s['custom-order']}>
                <h3>{details.customOrderTitle}</h3>
                <ul>
                    {details.customOrderItems.map((item) => (
                        <li key={item}>{item}</li>
                    ))}
                </ul>
            </article>
        </div>
    </section>
);

export default ProductCategoryDetails;
