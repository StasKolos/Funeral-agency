import PageContent from '@/c-widgets/pageContent/pageContent';
import ServiceDetails from '@/c-widgets/serviceDetails/serviceDetails';
import { serviceDetailsItems } from '@/d-shared/data/serviceDetailsItems';
import { inlineText } from '@/d-shared/utils/inlineText';

const MAIN_DESCRIPTION = inlineText`
    Выезжаем на кладбище, делаем замеры и подбираем благоустройство могилы:
    памятник, фундамент, плитку, ограду, лавку, стол и другие работы.
`;

const GraveImprovementPage = () => (
    <PageContent
        mainDescription={MAIN_DESCRIPTION}
        mainHeader={'Благоустройство могил и установка памятника в Хабаровске'}
        showReviews={true}
    >
        <ServiceDetails details={serviceDetailsItems.graveImprovement} />
    </PageContent>
);

export default GraveImprovementPage;
