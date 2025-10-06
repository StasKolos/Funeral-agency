import { Metadata } from 'next';
import { Montserrat } from 'next/font/google';
import { PropsWithChildren } from 'react';
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

const ExamplesLayout = ({ children }: PropsWithChildren) => (
    <html lang={'ru'}>
        <body className={montserrat.className}>
            {children}
        </body>
    </html>
);

export default ExamplesLayout;
