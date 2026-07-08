import ContactUs from '@/c-widgets/contactUs/contactUs';
import PageContent from '@/c-widgets/pageContent/pageContent';
import { inlineText } from '@/d-shared/utils/inlineText';

const MAIN_DESCRIPTION = inlineText`
    Свяжитесь с Грань ДВ по телефону, WhatsApp или Telegram. Подскажем порядок действий,
    примем срочную заявку и поможем с организацией ритуальных услуг.
`;

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
