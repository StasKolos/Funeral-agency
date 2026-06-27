import { PageContent } from '@/c-widgets/contentLayout/contentLayout';
import ServiceDetails from '@/c-widgets/serviceDetails/serviceDetails';
import { serviceDetailsItems } from '@/d-shared/data/serviceDetailsItems';

const GraveImprovementPage = () => (
    <PageContent showReviews={true}>
        <ServiceDetails details={serviceDetailsItems.graveImprovement} />
    </PageContent>
);

export default GraveImprovementPage;
