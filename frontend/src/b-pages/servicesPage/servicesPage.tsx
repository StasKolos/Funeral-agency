import { PageContent } from '@/c-widgets/contentLayout/contentLayout';
import CremationServices from '@/c-widgets/services/cremationServices/cremationServices';
import FuneralServices from '@/c-widgets/services/funeralServices/funeralServices';

const ServicesPage = () => (
    <PageContent>
        <FuneralServices />
        <CremationServices />
    </PageContent>
);

export default ServicesPage;
