import { PageContent } from '@/c-widgets/contentLayout/contentLayout';
import ServiceDetails from '@/c-widgets/serviceDetails/serviceDetails';
import { serviceDetailsItems } from '@/d-shared/data/serviceDetailsItems';

const CargoPage = () => (
    <PageContent showReviews={true}>
        <ServiceDetails details={serviceDetailsItems.cargo} />
    </PageContent>
);

export default CargoPage;
