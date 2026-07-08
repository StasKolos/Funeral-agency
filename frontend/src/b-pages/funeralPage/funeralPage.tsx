import PageContent from '@/c-widgets/pageContent/pageContent';
import ServiceDetails from '@/c-widgets/serviceDetails/serviceDetails';
import FuneralServices from '@/c-widgets/services/funeralServices/funeralServices';
import { serviceDetailsItems } from '@/d-shared/data/serviceDetailsItems';
import { inlineText } from '@/d-shared/utils/inlineText';

const MAIN_DESCRIPTION = inlineText`
    Организуем похороны от первого звонка до захоронения: перевозка в морг,
    документы, кладбище, катафалк, бригада, прощание и сопровождение семьи.
`;

const FuneralPage = () => (
    <PageContent
        mainDescription={MAIN_DESCRIPTION}
        mainHeader={'Сколько стоят похороны и захоронение на кладбище в Хабаровске'}
        showReviews={true}
    >
        <ServiceDetails details={serviceDetailsItems.funeral} />
        <FuneralServices />
    </PageContent>
);

export default FuneralPage;
