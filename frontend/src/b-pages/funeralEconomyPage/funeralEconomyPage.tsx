import PageContent from '@/c-widgets/pageContent/pageContent';
import ServiceDetails from '@/c-widgets/serviceDetails/serviceDetails';
import { serviceDetailsItems } from '@/d-shared/data/serviceDetailsItems';

const MAIN_DESCRIPTION = [
    'Базовый тариф от 21 000 ₽: гроб, временный памятник, катафалк, бригада,',
    'копка могилы и сопровождение документов без лишних расходов.',
].join(' ');

const FuneralEconomyPage = () => (
    <PageContent
        mainDescription={MAIN_DESCRIPTION}
        mainHeader={'Похороны эконом в Хабаровске'}
        showReviews={true}
    >
        <ServiceDetails details={serviceDetailsItems.funeralEconomy} />
    </PageContent>
);

export default FuneralEconomyPage;
