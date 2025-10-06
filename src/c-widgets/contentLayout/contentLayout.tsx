import { PropsWithChildren } from 'react';
import Footer from '../footer/footer';
import Header from '../header/header';

const ContentLayout = ({ children }: PropsWithChildren) => (
    <>
        <Header/>
            {children}
        <Footer/>
    </>
);

export default ContentLayout;
