import ContentLayout from '@/c-widgets/contentLayout/contentLayout';
import { SpeedInsights } from '@vercel/speed-insights/next';
import type { Metadata } from 'next';
import { Montserrat } from 'next/font/google';
import { PropsWithChildren } from 'react';
import { ToastContainer } from 'react-toastify';
import '../style.scss';

export const metadata: Metadata = {
    title: 'Грань ДВ',
    description: `Организация похорон, оказание ритуальных услуг, кремация, груз 200, перевозка умерших 24/7,
                благоустройство мест захоронений, продажа ритуальных товаров`,
};

const montserrat = Montserrat({
    weight: [ '400', '700' ],
    subsets: [ 'latin' ],
    display: 'swap',
});

const RootLayout = ({ children }: PropsWithChildren) => (
    <html lang={'ru'}>
        <body className={montserrat.className}>
            <SpeedInsights/>
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
