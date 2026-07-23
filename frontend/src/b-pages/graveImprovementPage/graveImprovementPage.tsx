import Faq from '@/c-widgets/faq/faq';
import GraveImprovementServices from '@/c-widgets/graveImprovementServices/graveImprovementServices';
import PageContent from '@/c-widgets/pageContent/pageContent';
import ServiceDetails from '@/c-widgets/serviceDetails/serviceDetails';
import { graveImprovementFaqItems } from '@/d-shared/data/faqItems';
import { graveImprovementReviewsItems } from '@/d-shared/data/reviewsItems';
import { serviceDetailsItems } from '@/d-shared/data/serviceDetailsItems';
import { inlineText } from '@/d-shared/utils/inlineText';

const MAIN_DESCRIPTION = inlineText`
    Выезжаем на кладбище, делаем замеры и подбираем благоустройство могилы:
    памятник, фундамент, плитку, ограду, лавку, стол и другие работы.
`;

const GraveImprovementPage = () => (
    <PageContent
        mainDescription={MAIN_DESCRIPTION}
        mainHeader={'Благоустройство могил и установка памятника в Хабаровске'}
        reviewItems={graveImprovementReviewsItems}
        showReviews={true}
    >
        <ServiceDetails details={serviceDetailsItems.graveImprovement} />
        <GraveImprovementServices />
        <Faq items={graveImprovementFaqItems} />
    </PageContent>
);

export default GraveImprovementPage;
