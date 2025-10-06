import Gallery from '@/c-widgets/gallery/gallery';
import { examplesItems } from '@/d-shared/data/examplesItems';

const ExamplesGalleryPage = () => (
    <Gallery
        items={examplesItems}
        route={'examples-gallery'}
    />
);

export default ExamplesGalleryPage;
