import { PageContent } from '@/c-widgets/contentLayout/contentLayout';
import ServiceDetails from '@/c-widgets/serviceDetails/serviceDetails';
import { serviceDetailsItems } from '@/d-shared/data/serviceDetailsItems';

const CremationPaidPage = () => (
    <PageContent showReviews={true}>
        <ServiceDetails details={serviceDetailsItems.cremationPaid} />
    </PageContent>
);

export default CremationPaidPage;
