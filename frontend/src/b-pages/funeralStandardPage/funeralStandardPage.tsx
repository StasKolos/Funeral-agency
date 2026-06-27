import { PageContent } from '@/c-widgets/contentLayout/contentLayout';
import ServiceDetails from '@/c-widgets/serviceDetails/serviceDetails';
import { serviceDetailsItems } from '@/d-shared/data/serviceDetailsItems';

const FuneralStandardPage = () => (
    <PageContent showReviews={true}>
        <ServiceDetails details={serviceDetailsItems.funeralStandard} />
    </PageContent>
);

export default FuneralStandardPage;
