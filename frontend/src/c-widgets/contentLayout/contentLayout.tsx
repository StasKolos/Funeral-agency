import { Children, Fragment, type PropsWithChildren, type ReactNode } from 'react';

import Feedback from '@/c-widgets/feedback/feedback';
import Main from '@/c-widgets/main/main';
import Reviews from '@/c-widgets/reviews/reviews';

import Footer from '../footer/footer';
import Header from '../header/header';

type PageContentProps = {
    children?: ReactNode;
    showFeedback?: boolean;
    showReviews?: boolean;
};

const Divider = () => <div className={'divider'} />;

const ContentLayout = ({ children }: PropsWithChildren) => (
    <>
        <Header />
        {children}
        <Footer />
    </>
);

export const PageContent = ({
    children,
    showFeedback = true,
    showReviews = false,
}: PageContentProps) => (
    <div className={'page-container'}>
        <Main />
        <Divider />
        {Children.toArray(children).map((section, index) => (
            <Fragment key={index}>
                {section}
                <Divider />
            </Fragment>
        ))}
        {showFeedback && (
            <>
                <Feedback />
                <Divider />
            </>
        )}
        {showReviews && (
            <>
                <Reviews />
                <Divider />
            </>
        )}
    </div>
);

export default ContentLayout;
