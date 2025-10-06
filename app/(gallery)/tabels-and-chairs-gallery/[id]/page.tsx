import ProductsGalleryPage from '@/b-pages/galleryPages/productsGalleryPage';
import { ProductsEnum } from '@/d-shared/enums/productsEnum';

const Page = () => (
    <ProductsGalleryPage
        items={ProductsEnum.TABLES_AND_CHAIRS.items}
        route={ProductsEnum.TABLES_AND_CHAIRS.route}
    />
);

export default Page;
