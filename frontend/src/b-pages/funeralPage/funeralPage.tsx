import { PageContent } from '@/c-widgets/contentLayout/contentLayout';
import ServiceDetails from '@/c-widgets/serviceDetails/serviceDetails';
import FuneralServices from '@/c-widgets/services/funeralServices/funeralServices';
import { serviceDetailsItems } from '@/d-shared/data/serviceDetailsItems';

const FuneralPage = () => (
    <PageContent showReviews={true}>
        <ServiceDetails details={serviceDetailsItems.funeral} />
        <FuneralServices />
    </PageContent>
);

export default FuneralPage;
