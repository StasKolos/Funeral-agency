import { PageContent } from '@/c-widgets/contentLayout/contentLayout';
import Products, { type ProductsProps } from '@/c-widgets/products/products';

type ProductsPageProps = ProductsProps;

const ProductsPage = (props: ProductsPageProps) => (
    <PageContent>
        <Products {...props} />
    </PageContent>
);

export default ProductsPage;
