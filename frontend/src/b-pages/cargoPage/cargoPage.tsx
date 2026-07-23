import CargoServices from '@/c-widgets/cargoServices/cargoServices';
import Faq from '@/c-widgets/faq/faq';
import PageContent from '@/c-widgets/pageContent/pageContent';
import ServiceDetails from '@/c-widgets/serviceDetails/serviceDetails';
import { cargoFaqItems } from '@/d-shared/data/faqItems';
import { cargoReviewsItems } from '@/d-shared/data/reviewsItems';
import { serviceDetailsItems } from '@/d-shared/data/serviceDetailsItems';
import { inlineText } from '@/d-shared/utils/inlineText';

const MAIN_DESCRIPTION = inlineText`
    Оформим документы и организуем перевозку умершего по Хабаровску,
    в другой город или из другого региона: наземным транспортом или авиа.
`;

const CargoPage = () => (
    <PageContent
        mainDescription={MAIN_DESCRIPTION}
        mainHeader={'Перевозка тела умершего в Хабаровске'}
        reviewItems={cargoReviewsItems}
        showReviews={true}
    >
        <ServiceDetails details={serviceDetailsItems.cargo} />
        <CargoServices />
        <Faq items={cargoFaqItems} />
    </PageContent>
);

export default CargoPage;
