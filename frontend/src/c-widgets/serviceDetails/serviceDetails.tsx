'use client';

import clsx from 'clsx';
import Link from 'next/link';
import { useId } from 'react';

import { ServiceDetailsItem } from '@/d-shared/data/serviceDetailsItems';
import { useScrollAnimation } from '@/d-shared/hooks/useScrollAnimation';

import s from './serviceDetails.module.scss';

type ServiceDetailsProps = {
    details: ServiceDetailsItem;
};

const ServiceDetails = ({ details }: ServiceDetailsProps) => {
    const columnsRef = useScrollAnimation<HTMLDivElement>(s['animated']);
    const titleId = useId();

    return (
        <section
            aria-labelledby={titleId}
            className={clsx('section-wrapper', s['wrapper'])}
            id={'ServiceDetails'}
        >
            <div className={clsx('content-wrapper', 'content')}>
                <div className={'header'}>
                    <p>{details.subtitle}</p>
                    <h2 id={titleId}>{details.title}</h2>
                </div>
                <div className={s['content']}>
                    <p className={s['intro']}>{details.intro}</p>
                    {details.related && (
                        <p className={s['related']}>
                            {details.related.map((part, index) =>
                                typeof part === 'string' ? (
                                    part
                                ) : (
                                    <Link
                                        href={part.href}
                                        key={`${part.href}-${index}`}
                                    >
                                        {part.text}
                                    </Link>
                                ),
                            )}
                        </p>
                    )}
                    <div
                        className={s['columns']}
                        ref={columnsRef}
                    >
                        <article className={s['column']}>
                            <h3>Что входит</h3>
                            <ul>
                                {details.included.map((item) => (
                                    <li key={item}>{item}</li>
                                ))}
                            </ul>
                        </article>
                        <article className={s['column']}>
                            <h3>Как проходит работа</h3>
                            <ol>
                                {details.process.map((item) => (
                                    <li key={item}>{item}</li>
                                ))}
                            </ol>
                        </article>
                        <article className={s['column']}>
                            <h3>Что важно знать</h3>
                            <ul>
                                {details.useful.map((item) => (
                                    <li key={item}>{item}</li>
                                ))}
                            </ul>
                        </article>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ServiceDetails;
