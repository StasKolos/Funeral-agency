import { PageContent } from '@/c-widgets/contentLayout/contentLayout';
import ServiceDetails from '@/c-widgets/serviceDetails/serviceDetails';
import CremationServices from '@/c-widgets/services/cremationServices/cremationServices';
import { serviceDetailsItems } from '@/d-shared/data/serviceDetailsItems';

const CremationPage = () => (
    <PageContent showReviews={true}>
        <ServiceDetails details={serviceDetailsItems.cremation} />
        <CremationServices />
    </PageContent>
);

export default CremationPage;
