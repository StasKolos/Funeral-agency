import PageContent from '@/c-widgets/pageContent/pageContent';
import ServiceDetails from '@/c-widgets/serviceDetails/serviceDetails';
import { serviceDetailsItems } from '@/d-shared/data/serviceDetailsItems';

const MAIN_DESCRIPTION = [
    'Выезжаем на кладбище, делаем замеры и подбираем благоустройство могилы:',
    'памятник, фундамент, плитку, ограду, лавку, стол и другие работы.',
].join(' ');

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
