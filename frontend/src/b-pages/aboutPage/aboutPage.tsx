import AboutUs from '@/c-widgets/aboutUs/aboutUs';
import PageContent from '@/c-widgets/pageContent/pageContent';

const MAIN_DESCRIPTION = [
    'Грань ДВ помогает семьям в Хабаровске организовать похороны, кремацию,',
    'перевозку умерших и благоустройство мест захоронений с внимательным сопровождением.',
].join(' ');

const AboutPage = () => (
    <PageContent
        mainDescription={MAIN_DESCRIPTION}
        mainHeader={'О ритуальном агентстве Грань ДВ в Хабаровске'}
        showReviews={true}
    >
        <AboutUs />
    </PageContent>
);

export default AboutPage;
