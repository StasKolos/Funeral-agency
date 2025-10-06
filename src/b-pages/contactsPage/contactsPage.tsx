import Feedback from '@/c-widgets/feedback/feedback';
import Main from '@/c-widgets/main/main';
import ContactUs from '@/c-widgets/contactUs/contactUs';

const ContactsPage = () => (
    <div className={'page-container'}>
        <Main/>
        <div className={'divider'}/>
        <ContactUs/>
        <div className={'divider'}/>
        <Feedback/>
        <div className={'divider'}/>
    </div>
);

export default ContactsPage;
