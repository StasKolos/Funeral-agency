import { PropsWithChildren } from 'react';

import Footer from '../footer/footer';
import Header from '../header/header';
import Reviews from '../reviews/reviews';

const ContentLayout = ({ children }: PropsWithChildren) => (
    <>
        <Header />
        {children}
        <Reviews />
        <div className={'divider'} />
        <Footer />
    </>
);

export default ContentLayout;
