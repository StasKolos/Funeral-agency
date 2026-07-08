import type { ProductCategory } from '@/d-shared/api/types';

import PageContent from '@/c-widgets/pageContent/pageContent';
import ProductCategories from '@/c-widgets/products/productCategories';
import { inlineText } from '@/d-shared/utils/inlineText';

type ProductsPageProps = {
    initialCategories?: ProductCategory[] | undefined;
};

const MAIN_DESCRIPTION = inlineText`
    Подберём ритуальные товары и принадлежности для похорон и благоустройства захоронений:
    гробы, венки, кресты, памятники, урны, корзины, вазы и другие категории.
`;

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
