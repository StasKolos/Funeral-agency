import Advantages from '@/c-widgets/advantages/advantages';
import Banner from '@/c-widgets/banner/banner';
import Examples from '@/c-widgets/examples/examples';
import Faq from '@/c-widgets/faq/faq';
import Feedback from '@/c-widgets/feedback/feedback';
import Law from '@/c-widgets/law/law';
import PageContent from '@/c-widgets/pageContent/pageContent';
import Reviews from '@/c-widgets/reviews/reviews';
import Services from '@/c-widgets/services/services';
import Steps from '@/c-widgets/steps/steps';

const MainPage = () => (
    <PageContent
        mainHeader={'Ритуальные услуги в Хабаровске'}
        showFeedback={false}
    >
        <Banner />
        <Advantages />
        <Steps />
        <Services />
        <Feedback />
        <Examples />
        <Faq />
        <Reviews />
        <Law />
    </PageContent>
);

export default MainPage;
