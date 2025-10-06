import ContentLayout from '@/c-widgets/contentLayout/contentLayout';
import type { Metadata } from 'next';
import { Montserrat } from 'next/font/google';
import { PropsWithChildren } from 'react';
import { ToastContainer } from 'react-toastify';
import '../style.scss';

export const metadata: Metadata = {
    title: 'Ритуальные услуги',
    description: 'Организация захоронений, оказание ритуальных услуг, продажа ритуальных товаров',
};

const montserrat = Montserrat({
    weight: [ '400', '700' ],
    subsets: [ 'latin' ],
    display: 'swap',
});

const RootLayout = ({ children }: PropsWithChildren) => (
    <html lang={'ru'}>
        <body className={montserrat.className}>
            <ToastContainer
                position={'bottom-right'}
                autoClose={5000}
                newestOnTop={false}
                closeOnClick={false}
                closeButton={false}
                hideProgressBar={true}
                draggable={true}
            />
            <ContentLayout>
                {children}
            </ContentLayout>
        </body>
    </html>
);

export default RootLayout;
