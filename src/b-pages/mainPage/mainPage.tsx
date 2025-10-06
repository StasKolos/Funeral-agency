import Advantages from '@/c-widgets/advantages/advantages';
import Feedback from '@/c-widgets/feedback/feedback';
import Main from '@/c-widgets/main/main';
import Steps from '@/c-widgets/steps/steps';
import Banner from '@/c-widgets/banner/banner';
import Law from '@/c-widgets/law/law';
import Services from '@/c-widgets/services/services';
import Examples from '@/c-widgets/examples/examples';

const MainPage = () => (
    <div className={'page-container'}>
        <Main/>
        <div className={'divider'}/>
        <Banner/>
        <div className={'divider'}/>
        <Advantages/>
        <div className={'divider'}/>
        <Steps/>
        <div className={'divider'}/>
        <Services/>
        <div className={'divider'}/>
        <Feedback/>
        <div className={'divider'}/>
        <Examples/>
        <div className={'divider'}/>
        <Law/>
        <div className={'divider'}/>
    </div>
);

export default MainPage;
