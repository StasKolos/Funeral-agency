import ContactUs from '@/c-widgets/contactUs/contactUs';
import PageContent from '@/c-widgets/pageContent/pageContent';

const MAIN_DESCRIPTION = [
    'Свяжитесь с Грань ДВ по телефону, WhatsApp или Telegram.',
    'Подскажем порядок действий, примем срочную заявку и поможем с организацией ритуальных услуг.',
].join(' ');

const ContactsPage = () => (
    <PageContent
        mainDescription={MAIN_DESCRIPTION}
        mainHeader={'Контакты ритуального агентства в Хабаровске'}
        showReviews={true}
    >
        <ContactUs />
    </PageContent>
);

export default ContactsPage;
