import PageContent from '@/c-widgets/pageContent/pageContent';
import ServiceDetails from '@/c-widgets/serviceDetails/serviceDetails';
import { serviceDetailsItems } from '@/d-shared/data/serviceDetailsItems';

const MAIN_DESCRIPTION = [
    'Оформим документы и организуем перевозку умершего по Хабаровску,',
    'в другой город или из другого региона: наземным транспортом или авиа.',
].join(' ');

const CargoPage = () => (
    <PageContent
        mainDescription={MAIN_DESCRIPTION}
        mainHeader={'Перевозка тела умершего в Хабаровске'}
        showReviews={true}
    >
        <ServiceDetails details={serviceDetailsItems.cargo} />
    </PageContent>
);

export default CargoPage;
