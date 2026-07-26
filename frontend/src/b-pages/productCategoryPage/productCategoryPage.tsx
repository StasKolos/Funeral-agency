import type { ProductCategory } from '@/d-shared/api/types';

import Faq from '@/c-widgets/faq/faq';
import PageContent from '@/c-widgets/pageContent/pageContent';
import ProductCategoryDetails from '@/c-widgets/productCategoryDetails/productCategoryDetails';
import ProductOrderProcess from '@/c-widgets/productOrderProcess/productOrderProcess';
import Products, { type ProductsProps } from '@/c-widgets/products/products';
import { getProductCategoryReviews } from '@/d-shared/data/reviewsItems';
import { getProductCategoryDetails } from '@/d-shared/products/productCategoryDetails';
import { getProductCategoryFaqItems } from '@/d-shared/products/productCategoryFaqItems';
import {
    createProductCategoryH1,
    createProductCategoryMainDescription,
} from '@/d-shared/products/productRoutes';

type ProductCategoryPageProps = ProductsProps & {
    category: ProductCategory;
};

const ProductCategoryPage = ({ category, ...productsProps }: ProductCategoryPageProps) => {
    const categoryDetails = getProductCategoryDetails(category.code);
    const categoryFaqItems = getProductCategoryFaqItems(category.code);

    return (
        <PageContent
            mainDescription={createProductCategoryMainDescription(category)}
            mainHeader={createProductCategoryH1(category)}
            reviewItems={getProductCategoryReviews(category.code)}
            showReviews={true}
        >
            <Products
                {...productsProps}
                fixedCategory={category}
            />
            <ProductOrderProcess />
            {categoryDetails && <ProductCategoryDetails details={categoryDetails} />}
            {categoryFaqItems && <Faq items={categoryFaqItems} />}
        </PageContent>
    );
};

export default ProductCategoryPage;
