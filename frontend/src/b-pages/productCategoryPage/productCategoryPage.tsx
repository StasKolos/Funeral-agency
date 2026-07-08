import type { ProductCategory } from '@/d-shared/api/types';

import PageContent from '@/c-widgets/pageContent/pageContent';
import Products, { type ProductsProps } from '@/c-widgets/products/products';
import {
    createProductCategoryH1,
    createProductCategoryMainDescription,
} from '@/d-shared/products/productRoutes';

type ProductCategoryPageProps = ProductsProps & {
    category: ProductCategory;
};

const ProductCategoryPage = ({ category, ...productsProps }: ProductCategoryPageProps) => (
    <PageContent
        mainDescription={createProductCategoryMainDescription(category)}
        mainHeader={createProductCategoryH1(category)}
        showReviews={true}
    >
        <Products
            {...productsProps}
            fixedCategory={category}
        />
    </PageContent>
);

export default ProductCategoryPage;
