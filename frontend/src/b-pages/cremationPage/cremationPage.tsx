import CremationServices from '@/c-widgets/cremationServices/cremationServices';
import Faq from '@/c-widgets/faq/faq';
import PageContent from '@/c-widgets/pageContent/pageContent';
import ServiceDetails from '@/c-widgets/serviceDetails/serviceDetails';
import { cremationFaqItems } from '@/d-shared/data/faqItems';
import { cremationReviewsItems } from '@/d-shared/data/reviewsItems';
import { serviceDetailsItems } from '@/d-shared/data/serviceDetailsItems';
import { inlineText } from '@/d-shared/utils/inlineText';

const MAIN_DESCRIPTION = inlineText`
    Поможем оформить кремацию, передать вещи в морг, подобрать гроб и урну,
    организовать транспорт, документы, прощание и дальнейшее захоронение праха.
`;

const CremationPage = () => (
    <PageContent
        mainDescription={MAIN_DESCRIPTION}
        mainHeader={'Сколько стоит кремировать человека в Хабаровске'}
        reviewItems={cremationReviewsItems}
        showReviews={true}
    >
        <ServiceDetails details={serviceDetailsItems.cremation} />
        <CremationServices />
        <Faq items={cremationFaqItems} />
    </PageContent>
);

export default CremationPage;
