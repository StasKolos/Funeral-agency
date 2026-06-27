import AboutUs from '@/c-widgets/aboutUs/aboutUs';
import { PageContent } from '@/c-widgets/contentLayout/contentLayout';

const AboutPage = () => (
    <PageContent showReviews={true}>
        <AboutUs />
    </PageContent>
);

export default AboutPage;
