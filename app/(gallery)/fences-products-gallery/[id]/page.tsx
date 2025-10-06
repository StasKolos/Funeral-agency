import ProductsGalleryPage from '@/b-pages/galleryPages/productsGalleryPage';
import { ProductsEnum } from '@/d-shared/enums/productsEnum';

const Page = () => (
    <ProductsGalleryPage
        items={ProductsEnum.FENCES.items}
        route={ProductsEnum.FENCES.route}
    />
);

export default Page;
