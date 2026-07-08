import PageContent from '@/c-widgets/pageContent/pageContent';
import ServiceDetails from '@/c-widgets/serviceDetails/serviceDetails';
import CremationServices from '@/c-widgets/services/cremationServices/cremationServices';
import { serviceDetailsItems } from '@/d-shared/data/serviceDetailsItems';
import { inlineText } from '@/d-shared/utils/inlineText';

const MAIN_DESCRIPTION = inlineText`
    Поможем оформить кремацию, передать вещи в морг, подобрать гроб и урну,
    организовать транспорт, документы, прощание и дальнейшее захоронение праха.
`;

const CremationPage = () => (
    <PageContent
        mainDescription={MAIN_DESCRIPTION}
        mainHeader={'Сколько стоит кремировать человека в Хабаровске'}
        showReviews={true}
    >
        <ServiceDetails details={serviceDetailsItems.cremation} />
        <CremationServices />
    </PageContent>
);

export default CremationPage;
