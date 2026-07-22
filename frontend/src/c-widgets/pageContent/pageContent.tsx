import { Children, Fragment, type ReactNode } from 'react';

import type { ReviewItem } from '@/d-shared/data/reviewsItems';

import Feedback from '@/c-widgets/feedback/feedback';
import Main from '@/c-widgets/main/main';
import Reviews from '@/c-widgets/reviews/reviews';

type PageContentProps = {
    children?: ReactNode;
    mainDescription?: string;
    mainHeader?: string;
    reviewItems?: ReviewItem[];
    showFeedback?: boolean;
    showReviews?: boolean;
};

const Divider = () => <div className={'divider'} />;

const PageContent = ({
    children,
    mainDescription,
    mainHeader,
    reviewItems,
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
                <Reviews items={reviewItems} />
                <Divider />
            </>
        )}
    </div>
);

export default PageContent;
