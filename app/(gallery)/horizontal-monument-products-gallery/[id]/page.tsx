import ProductsGalleryPage from '@/b-pages/galleryPages/productsGalleryPage';
import { ProductsEnum } from '@/d-shared/enums/productsEnum';

const Page = () => (
    <ProductsGalleryPage
        items={ProductsEnum.HORIZONTAL_MONUMENT.items}
        route={ProductsEnum.HORIZONTAL_MONUMENT.route}
    />
);

export default Page;
