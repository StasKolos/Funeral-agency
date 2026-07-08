import PageContent from '@/c-widgets/pageContent/pageContent';
import ServiceDetails from '@/c-widgets/serviceDetails/serviceDetails';
import { serviceDetailsItems } from '@/d-shared/data/serviceDetailsItems';

const MAIN_DESCRIPTION = [
    'Тариф от 65 000 ₽ с бархатным гробом и гранитным памятником.',
    'Берём на себя документы, транспорт, бригаду, копку могилы и сопровождение церемонии.',
].join(' ');

const FuneralStandardPage = () => (
    <PageContent
        mainDescription={MAIN_DESCRIPTION}
        mainHeader={'Похороны стандарт в Хабаровске'}
        showReviews={true}
    >
        <ServiceDetails details={serviceDetailsItems.funeralStandard} />
    </PageContent>
);

export default FuneralStandardPage;
