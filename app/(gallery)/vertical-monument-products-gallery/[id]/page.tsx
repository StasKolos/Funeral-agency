import ProductsGalleryPage from '@/b-pages/galleryPages/productsGalleryPage';
import { ProductsEnum } from '@/d-shared/enums/productsEnum';

const Page = () => (
    <ProductsGalleryPage
        items={ProductsEnum.VERTICAL_MONUMENT.items}
        route={ProductsEnum.VERTICAL_MONUMENT.route}
    />
);

export default Page;
