import { PageContent } from '@/c-widgets/contentLayout/contentLayout';
import ServiceDetails from '@/c-widgets/serviceDetails/serviceDetails';
import { serviceDetailsItems } from '@/d-shared/data/serviceDetailsItems';

const FuneralEconomyPage = () => (
    <PageContent showReviews={true}>
        <ServiceDetails details={serviceDetailsItems.funeralEconomy} />
    </PageContent>
);

export default FuneralEconomyPage;
