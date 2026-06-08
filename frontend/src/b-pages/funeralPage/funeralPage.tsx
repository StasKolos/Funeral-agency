import Feedback from '@/c-widgets/feedback/feedback';
import Main from '@/c-widgets/main/main';
import Reviews from '@/c-widgets/reviews/reviews';
import ServiceDetails from '@/c-widgets/serviceDetails/serviceDetails';
import FuneralServices from '@/c-widgets/services/funeralServices/funeralServices';
import { serviceDetailsItems } from '@/d-shared/data/serviceDetailsItems';

const FuneralPage = () => (
    <div className={'page-container'}>
        <Main />
        <div className={'divider'} />
        <ServiceDetails details={serviceDetailsItems.funeral} />
        <div className={'divider'} />
        <FuneralServices />
        <div className={'divider'} />
        <Feedback />
        <div className={'divider'} />
        <Reviews />
        <div className={'divider'} />
    </div>
);

export default FuneralPage;
