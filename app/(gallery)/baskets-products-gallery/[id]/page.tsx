import ProductsGalleryPage from '@/b-pages/galleryPages/productsGalleryPage';
import { ProductsEnum } from '@/d-shared/enums/productsEnum';

const Page = () => (
    <ProductsGalleryPage
        items={ProductsEnum.BASKETS.items}
        route={ProductsEnum.BASKETS.route}
    />
);

export default Page;
