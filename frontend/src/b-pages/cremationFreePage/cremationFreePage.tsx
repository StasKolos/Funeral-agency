import { PageContent } from '@/c-widgets/contentLayout/contentLayout';
import ServiceDetails from '@/c-widgets/serviceDetails/serviceDetails';
import { serviceDetailsItems } from '@/d-shared/data/serviceDetailsItems';

const CremationFreePage = () => (
    <PageContent showReviews={true}>
        <ServiceDetails details={serviceDetailsItems.cremationFree} />
    </PageContent>
);

export default CremationFreePage;
