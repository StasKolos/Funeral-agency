import { Children, Fragment, type ReactNode } from 'react';

import Feedback from '@/c-widgets/feedback/feedback';
import Main from '@/c-widgets/main/main';
import Reviews from '@/c-widgets/reviews/reviews';

type PageContentProps = {
    children?: ReactNode;
    mainDescription?: string;
    mainHeader?: string;
    showFeedback?: boolean;
    showReviews?: boolean;
};

const Divider = () => <div className={'divider'} />;

const PageContent = ({
    children,
    mainDescription,
    mainHeader,
    showFeedback = true,
    showReviews = false,
}: PageContentProps) => (
    <div className={'page-container'}>
        <Main
            description={mainDescription}
            header={mainHeader}
        />
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

export default PageContent;
