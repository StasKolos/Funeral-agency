import PageContent from '@/c-widgets/pageContent/pageContent';
import ServiceDetails from '@/c-widgets/serviceDetails/serviceDetails';
import { serviceDetailsItems } from '@/d-shared/data/serviceDetailsItems';

const MAIN_DESCRIPTION = [
    'Бюджетный тариф от 40 000 ₽ с бархатным гробом и памятником из мраморной крошки.',
    'Организуем перевозку, документы, катафалк, бригаду и захоронение.',
].join(' ');

const FuneralEconomyPlusPage = () => (
    <PageContent
        mainDescription={MAIN_DESCRIPTION}
        mainHeader={'Похороны Эконом-плюс в Хабаровске'}
        showReviews={true}
    >
        <ServiceDetails details={serviceDetailsItems.funeralEconomyPlus} />
    </PageContent>
);

export default FuneralEconomyPlusPage;
