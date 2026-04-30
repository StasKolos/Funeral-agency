import AboutUs from '@/c-widgets/aboutUs/aboutUs';
import Feedback from '@/c-widgets/feedback/feedback';
import Main from '@/c-widgets/main/main';

const AboutPage = () => (
    <div className={'page-container'}>
        <Main />
        <div className={'divider'} />
        <AboutUs />
        <div className={'divider'} />
        <Feedback />
        <div className={'divider'} />
    </div>
);

export default AboutPage;
