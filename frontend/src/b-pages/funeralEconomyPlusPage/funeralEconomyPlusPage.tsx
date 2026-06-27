import { PageContent } from '@/c-widgets/contentLayout/contentLayout';
import ServiceDetails from '@/c-widgets/serviceDetails/serviceDetails';
import { serviceDetailsItems } from '@/d-shared/data/serviceDetailsItems';

const FuneralEconomyPlusPage = () => (
    <PageContent showReviews={true}>
        <ServiceDetails details={serviceDetailsItems.funeralEconomyPlus} />
    </PageContent>
);

export default FuneralEconomyPlusPage;
