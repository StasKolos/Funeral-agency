import type { ProductCategory } from '@/d-shared/api/types';

import PageContent from '@/c-widgets/pageContent/pageContent';
import ProductCategories from '@/c-widgets/products/productCategories';

type ProductsPageProps = {
    initialCategories?: ProductCategory[] | undefined;
};

const MAIN_DESCRIPTION = [
    'Подберём ритуальные товары и принадлежности для похорон и благоустройства захоронений:',
    'гробы, венки, кресты, памятники, урны, корзины, вазы и другие категории.',
].join(' ');

const ProductsPage = (props: ProductsPageProps) => (
    <PageContent
        mainDescription={MAIN_DESCRIPTION}
        mainHeader={'Ритуальные товары и принадлежности в Хабаровске'}
        showReviews={true}
    >
        <ProductCategories categories={props.initialCategories} />
    </PageContent>
);

export default ProductsPage;
