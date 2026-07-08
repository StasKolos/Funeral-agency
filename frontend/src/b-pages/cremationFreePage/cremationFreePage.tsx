import PageContent from '@/c-widgets/pageContent/pageContent';
import ServiceDetails from '@/c-widgets/serviceDetails/serviceDetails';
import { serviceDetailsItems } from '@/d-shared/data/serviceDetailsItems';

const MAIN_DESCRIPTION = [
    'Поможем проверить возможность бесплатной кремации, объясним порядок документов',
    'и организуем передачу вещей в морг через специалиста без лишних поездок для семьи.',
].join(' ');

const CremationFreePage = () => (
    <PageContent
        mainDescription={MAIN_DESCRIPTION}
        mainHeader={'Бесплатная кремация в Хабаровске'}
        showReviews={true}
    >
        <ServiceDetails details={serviceDetailsItems.cremationFree} />
    </PageContent>
);

export default CremationFreePage;
