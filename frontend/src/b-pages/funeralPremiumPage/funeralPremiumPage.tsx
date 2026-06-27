import { PageContent } from '@/c-widgets/contentLayout/contentLayout';
import ServiceDetails from '@/c-widgets/serviceDetails/serviceDetails';
import { serviceDetailsItems } from '@/d-shared/data/serviceDetailsItems';

const FuneralPremiumPage = () => (
    <PageContent showReviews={true}>
        <ServiceDetails details={serviceDetailsItems.funeralPremium} />
    </PageContent>
);

export default FuneralPremiumPage;
