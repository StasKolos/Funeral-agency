'use client';

import clsx from 'clsx';
import Image, { type ImageProps } from 'next/image';
import { useState } from 'react';

import s from './imageWithSkeleton.module.scss';

type ImageWithSkeletonProps = ImageProps & {
    wrapperClassName?: string;
};

const ImageWithSkeleton = ({
    className,
    onLoad,
    wrapperClassName,
    ...props
}: ImageWithSkeletonProps) => {
    const [isLoaded, setIsLoaded] = useState(false);

    return (
        <span
            className={clsx(s['wrapper'], wrapperClassName, {
                [s['wrapper-loaded']]: isLoaded,
            })}
        >
            <span className={s['skeleton']} />
            <Image
                {...props}
                className={clsx(s['image'], className)}
                onLoad={(event) => {
                    setIsLoaded(true);
                    onLoad?.(event);
                }}
            />
        </span>
    );
};

export default ImageWithSkeleton;
