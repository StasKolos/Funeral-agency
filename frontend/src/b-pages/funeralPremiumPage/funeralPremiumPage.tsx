import Feedback from '@/c-widgets/feedback/feedback';
import Main from '@/c-widgets/main/main';
import Reviews from '@/c-widgets/reviews/reviews';
import ServiceDetails from '@/c-widgets/serviceDetails/serviceDetails';
import { serviceDetailsItems } from '@/d-shared/data/serviceDetailsItems';

const FuneralPremiumPage = () => (
    <div className={'page-container'}>
        <Main />
        <div className={'divider'} />
        <ServiceDetails details={serviceDetailsItems.funeralPremium} />
        <div className={'divider'} />
        <Feedback />
        <div className={'divider'} />
        <Reviews />
        <div className={'divider'} />
    </div>
);

export default FuneralPremiumPage;
