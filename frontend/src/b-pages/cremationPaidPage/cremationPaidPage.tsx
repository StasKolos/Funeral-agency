import PageContent from '@/c-widgets/pageContent/pageContent';
import ServiceDetails from '@/c-widgets/serviceDetails/serviceDetails';
import { serviceDetailsItems } from '@/d-shared/data/serviceDetailsItems';

const MAIN_DESCRIPTION = [
    'Организуем платную кремацию с гробом, урной, катафалком, бригадой,',
    'документами и копкой могилы под урну. Состав услуги согласуем заранее.',
].join(' ');

const CremationPaidPage = () => (
    <PageContent
        mainDescription={MAIN_DESCRIPTION}
        mainHeader={'Платная кремация в Хабаровске'}
        showReviews={true}
    >
        <ServiceDetails details={serviceDetailsItems.cremationPaid} />
    </PageContent>
);

export default CremationPaidPage;
