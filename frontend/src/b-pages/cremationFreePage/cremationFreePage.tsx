import PageContent from '@/c-widgets/pageContent/pageContent';
import ServiceDetails from '@/c-widgets/serviceDetails/serviceDetails';
import { serviceDetailsItems } from '@/d-shared/data/serviceDetailsItems';
import { inlineText } from '@/d-shared/utils/inlineText';

const MAIN_DESCRIPTION = inlineText`
    Поможем проверить возможность бесплатной кремации, объясним порядок документов
    и организуем передачу вещей в морг через специалиста без лишних поездок для семьи.
`;

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
