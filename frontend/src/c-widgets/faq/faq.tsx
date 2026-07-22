'use client';

import clsx from 'clsx';
import { useState } from 'react';

import { faqItems, type FaqItem } from '@/d-shared/data/faqItems';
import { useScrollAnimation } from '@/d-shared/hooks/useScrollAnimation';

import s from './faq.module.scss';

type FaqProps = {
    items?: FaqItem[];
};

const Faq = ({ items = faqItems }: FaqProps) => {
    const [openedIndex, setOpenedIndex] = useState<number | null>(null);
    const listRef = useScrollAnimation<HTMLUListElement>(s['animated']);
    const faqJsonLd = JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: items.map((item) => ({
            '@type': 'Question',
            name: item.question,
            acceptedAnswer: {
                '@type': 'Answer',
                text: item.answer,
            },
        })),
    }).replace(/</g, '\\u003c');

    return (
        <section
            aria-labelledby={'faq-title'}
            className={clsx('section-wrapper', s['wrapper'])}
        >
            <script
                dangerouslySetInnerHTML={{ __html: faqJsonLd }}
                type={'application/ld+json'}
            />
            <div className={clsx('content-wrapper', 'content')}>
                <div className={'header'}>
                    <p>Собрали главное, что обычно уточняют перед обращением</p>
                    <h2 id={'faq-title'}>Ответы на ваши вопросы</h2>
                </div>
                <ul
                    className={s['items']}
                    ref={listRef}
                >
                    {items.map((item, index) => {
                        const isOpened = openedIndex === index;
                        const answerId = `faq-answer-${index}`;
                        const questionId = `faq-question-${index}`;

                        return (
                            <li
                                className={clsx(s['item'], {
                                    [s['item--opened']]: isOpened,
                                })}
                                key={item.question}
                            >
                                <button
                                    aria-controls={answerId}
                                    aria-expanded={isOpened}
                                    className={s['question']}
                                    id={questionId}
                                    onClick={() => setOpenedIndex(isOpened ? null : index)}
                                    type={'button'}
                                >
                                    <span>{item.question}</span>
                                    <span
                                        aria-hidden={true}
                                        className={s['icon']}
                                    />
                                </button>
                                <p
                                    aria-labelledby={questionId}
                                    className={s['answer']}
                                    hidden={!isOpened}
                                    id={answerId}
                                >
                                    {item.answer}
                                </p>
                            </li>
                        );
                    })}
                </ul>
            </div>
        </section>
    );
};

export default Faq;
