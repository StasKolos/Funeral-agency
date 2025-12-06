import { useEffect, useRef } from 'react';

export const useScrollAnimation = <T extends HTMLElement = HTMLElement>(animationClass: string) => {
    const ref = useRef<T>(null);

    useEffect(() => {
        const element = ref.current;
        if (!element) return;

        const observer = new IntersectionObserver(entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add(animationClass);
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1 });

        observer.observe(element);

        return () => observer.unobserve(element);
    }, [ animationClass ]);

    return ref;
};
