import PageContent from '@/c-widgets/pageContent/pageContent';
import ServiceDetails from '@/c-widgets/serviceDetails/serviceDetails';
import { serviceDetailsItems } from '@/d-shared/data/serviceDetailsItems';

const MAIN_DESCRIPTION = [
    'Расширенный комплекс от 90 000 ₽ с лакированным гробом, мягкой подушкой',
    'и гранитным памятником. Сопровождаем семью на всех этапах церемонии.',
].join(' ');

const FuneralPremiumPage = () => (
    <PageContent
        mainDescription={MAIN_DESCRIPTION}
        mainHeader={'Похороны премиум в Хабаровске'}
        showReviews={true}
    >
        <ServiceDetails details={serviceDetailsItems.funeralPremium} />
    </PageContent>
);

export default FuneralPremiumPage;
