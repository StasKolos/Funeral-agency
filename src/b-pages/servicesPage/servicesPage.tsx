import Main from '@/c-widgets/main/main';
import CremationServices from '@/c-widgets/services/cremationServices/cremationServices';
import FuneralServices from '@/c-widgets/services/funeralServices/funeralServices';

const ServicesPage = () => (
    <div className={'page-container'}>
        <Main/>
        <div className={'divider'}/>
        <FuneralServices/>
        <div className={'divider'}/>
        <CremationServices/>
        <div className={'divider'}/>
    </div>
);

export default ServicesPage;
