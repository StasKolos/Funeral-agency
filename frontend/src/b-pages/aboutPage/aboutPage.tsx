import AboutUs from '@/c-widgets/aboutUs/aboutUs';
import Feedback from '@/c-widgets/feedback/feedback';
import Main from '@/c-widgets/main/main';
import Reviews from '@/c-widgets/reviews/reviews';

const AboutPage = () => (
    <div className={'page-container'}>
        <Main />
        <div className={'divider'} />
        <AboutUs />
        <div className={'divider'} />
        <Feedback />
        <div className={'divider'} />
        <Reviews />
        <div className={'divider'} />
    </div>
);

export default AboutPage;
