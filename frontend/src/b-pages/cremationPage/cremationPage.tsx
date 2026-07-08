import PageContent from '@/c-widgets/pageContent/pageContent';
import ServiceDetails from '@/c-widgets/serviceDetails/serviceDetails';
import CremationServices from '@/c-widgets/services/cremationServices/cremationServices';
import { serviceDetailsItems } from '@/d-shared/data/serviceDetailsItems';

const MAIN_DESCRIPTION = [
    'Поможем оформить кремацию, передать вещи в морг, подобрать гроб и урну,',
    'организовать транспорт, документы, прощание и дальнейшее захоронение праха.',
].join(' ');

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
