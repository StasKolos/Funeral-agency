import Gallery from '@/c-widgets/gallery/gallery';
import { ExamplesItem } from '@/d-shared/data/examplesItems';

interface ProductsGalleryPageProps {
    items: ExamplesItem[];
    route: string;
}

const ProductsGalleryPage = ({ items, route }: ProductsGalleryPageProps) => (
    <Gallery
        items={items}
        route={route}
        isProductsGallery={true}
    />
);

export default ProductsGalleryPage;
