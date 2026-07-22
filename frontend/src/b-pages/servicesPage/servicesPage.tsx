import CremationServices from '@/c-widgets/cremationServices/cremationServices';
import FuneralServices from '@/c-widgets/funeralServices/funeralServices';
import PageContent from '@/c-widgets/pageContent/pageContent';

const ServicesPage = () => (
    <PageContent>
        <FuneralServices />
        <CremationServices />
    </PageContent>
);

export default ServicesPage;
