import PageContent from '@/c-widgets/pageContent/pageContent';
import ServiceDetails from '@/c-widgets/serviceDetails/serviceDetails';
import { serviceDetailsItems } from '@/d-shared/data/serviceDetailsItems';
import { inlineText } from '@/d-shared/utils/inlineText';

const MAIN_DESCRIPTION = inlineText`
    Расширенный комплекс от 90 000 ₽ с лакированным гробом, мягкой подушкой
    и гранитным памятником. Сопровождаем семью на всех этапах церемонии.
`;

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
