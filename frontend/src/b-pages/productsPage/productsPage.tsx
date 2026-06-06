import Feedback from '@/c-widgets/feedback/feedback';
import Main from '@/c-widgets/main/main';
import Products from '@/c-widgets/products/products';

const ProductsPage = () => (
    <div className={'page-container'}>
        <Main />
        <div className={'divider'} />
        <Products />
        <div className={'divider'} />
        <Feedback />
        <div className={'divider'} />
    </div>
);

export default ProductsPage;
