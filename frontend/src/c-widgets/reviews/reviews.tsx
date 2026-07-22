'use client';

import clsx from 'clsx';
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';

import { reviewsItems, reviewsSummary, type ReviewItem } from '@/d-shared/data/reviewsItems';
import { useScrollAnimation } from '@/d-shared/hooks/useScrollAnimation';

import s from './reviews.module.scss';

const MAX_RATING = 5;
const OVERFLOW_TOLERANCE = 1;

type ReviewsProps = {
    items?: ReviewItem[] | undefined;
};

type ReviewTextProps = {
    author: string;
    isExpanded: boolean;
    onExpand: () => void;
    text: string;
};

const ReviewText = ({ text, author, isExpanded, onExpand }: ReviewTextProps) => {
    const [isExpandable, setIsExpandable] = useState(false);
    const textRef = useRef<HTMLParagraphElement>(null);

    useEffect(() => {
        const element = textRef.current;

        if (!element || isExpanded) return;

        const updateCanExpand = () => {
            setIsExpandable(element.scrollHeight > element.clientHeight + OVERFLOW_TOLERANCE);
        };

        updateCanExpand();

        const resizeObserver = new ResizeObserver(updateCanExpand);
        resizeObserver.observe(element);

        return () => resizeObserver.disconnect();
    }, [isExpanded, text]);

    return (
        <>
            <p
                className={clsx(s['text'], {
                    [s['text-clamped']]: !isExpanded,
                })}
                ref={textRef}
            >
                {text}
            </p>
            {isExpandable && !isExpanded && (
                <button
                    aria-label={`Показать отзыв полностью: ${author}`}
                    className={s['more-button']}
                    onClick={onExpand}
                    type={'button'}
                >
                    Далее
                </button>
            )}
        </>
    );
};

const Reviews = ({ items = reviewsItems }: ReviewsProps) => {
    const listRef = useScrollAnimation<HTMLUListElement>(s['animated']);
    const summaryRef = useScrollAnimation<HTMLDivElement>(s['animated']);
    const [expandedReviewKey, setExpandedReviewKey] = useState<string | null>(null);

    return (
        <section className={clsx('section-wrapper', s['wrapper'])}>
            <div className={clsx('content-wrapper', 'content')}>
                <div className={'header'}>
                    <p>Отзывы клиентов</p>
                    <h2>Нам доверяют в сложные моменты</h2>
                </div>
                <div
                    className={s['summary']}
                    ref={summaryRef}
                >
                    <div>
                        <span>{reviewsSummary.rating}</span>
                        <p>{reviewsSummary.count} в 2ГИС</p>
                    </div>
                    <Link
                        aria-label={'Смотреть отзывы о компании в 2ГИС, откроется в новой вкладке'}
                        className={s['source-link']}
                        href={reviewsSummary.sourceUrl}
                        rel={'noopener noreferrer'}
                        target={'_blank'}
                    >
                        Смотреть в 2ГИС
                    </Link>
                </div>
                <ul
                    className={s['items']}
                    ref={listRef}
                >
                    {items.map((review) => {
                        const reviewKey = `${review.name}-${review.date}`;
                        const isExpanded = expandedReviewKey === reviewKey;

                        return (
                            <li
                                className={clsx(s['item'], {
                                    [s['item-expanded']]: isExpanded,
                                })}
                                key={reviewKey}
                            >
                                <article>
                                    <div className={s['author']}>
                                        <div
                                            aria-hidden={'true'}
                                            className={s['avatar']}
                                        >
                                            {review.initials}
                                        </div>
                                        <div>
                                            <h3>{review.name}</h3>
                                            <p>{review.date}</p>
                                        </div>
                                    </div>
                                    <div
                                        aria-label={`${review.rating} из ${MAX_RATING}`}
                                        className={s['stars']}
                                        role={'img'}
                                    >
                                        {Array.from({ length: MAX_RATING }).map((_, index) => (
                                            <span
                                                aria-hidden={true}
                                                key={index}
                                            >
                                                {index < review.rating ? '★' : '☆'}
                                            </span>
                                        ))}
                                    </div>
                                    <ReviewText
                                        author={review.name}
                                        isExpanded={isExpanded}
                                        onExpand={() => setExpandedReviewKey(reviewKey)}
                                        text={review.text}
                                    />
                                </article>
                            </li>
                        );
                    })}
                </ul>
            </div>
        </section>
    );
};

export default Reviews;
