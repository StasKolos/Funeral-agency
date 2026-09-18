import { Injectable, Logger, ServiceUnavailableException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import nodemailer from 'nodemailer';

const DEFAULT_SMTP_PORT = 465;
const ORDER_EMAIL_SUBJECT = 'Новый заказ с сайта «Грань ДВ»';

export type OrderEmailItem = {
    id: number;
    name: string;
    price: number;
    quantity: number;
};

export type OrderEmail = {
    email?: string;
    items: OrderEmailItem[];
    name: string;
    phone: string;
    totalPrice: number;
};

const priceFormatter = new Intl.NumberFormat('ru-RU');

const formatPrice = (price: number) => `${priceFormatter.format(price)} ₽`;

const escapeHtml = (value: string) =>
    value.replace(
        /[&<>"']/g,
        (character) =>
            ({
                '&': '&amp;',
                '<': '&lt;',
                '>': '&gt;',
                '"': '&quot;',
                "'": '&#039;',
            })[character] ?? character,
    );

const createTextBody = ({ email, items, name, phone, totalPrice }: OrderEmail) => {
    const itemLines = items.map((item, index) =>
        [
            `${index + 1}. ${item.name} (ID ${item.id}) —`,
            `${formatPrice(item.price)} × ${item.quantity} =`,
            formatPrice(item.price * item.quantity),
        ].join(' '),
    );

    return [
        'Новый заказ с сайта «Грань ДВ»',
        '',
        `Имя: ${name}`,
        `Телефон: ${phone}`,
        `Почта: ${email ?? 'не указана'}`,
        '',
        'Товары:',
        ...itemLines,
        '',
        `Итого: ${formatPrice(totalPrice)}`,
    ].join('\n');
};

const createHtmlBody = ({ email, items, name, phone, totalPrice }: OrderEmail) => {
    const itemRows = items
        .map(
            (item) => `
                <tr>
                    <td style="padding:8px;border:1px solid #cccccc">${escapeHtml(item.name)}</td>
                    <td style="padding:8px;border:1px solid #cccccc">${item.id}</td>
                    <td style="padding:8px;border:1px solid #cccccc">${formatPrice(item.price)}</td>
                    <td style="padding:8px;border:1px solid #cccccc">${item.quantity}</td>
                    <td style="padding:8px;border:1px solid #cccccc">
                        ${formatPrice(item.price * item.quantity)}
                    </td>
                </tr>
            `,
        )
        .join('');

    return `
        <h1 style="font-size:22px">Новый заказ с сайта «Грань ДВ»</h1>
        <p><strong>Имя:</strong> ${escapeHtml(name)}</p>
        <p><strong>Телефон:</strong> ${escapeHtml(phone)}</p>
        <p><strong>Почта:</strong> ${escapeHtml(email ?? 'не указана')}</p>
        <table style="border-collapse:collapse;width:100%">
            <thead>
                <tr>
                    <th style="padding:8px;border:1px solid #cccccc;text-align:left">Товар</th>
                    <th style="padding:8px;border:1px solid #cccccc;text-align:left">ID</th>
                    <th style="padding:8px;border:1px solid #cccccc;text-align:left">Цена</th>
                    <th style="padding:8px;border:1px solid #cccccc;text-align:left">Количество</th>
                    <th style="padding:8px;border:1px solid #cccccc;text-align:left">Сумма</th>
                </tr>
            </thead>
            <tbody>${itemRows}</tbody>
        </table>
        <p style="font-size:18px"><strong>Итого: ${formatPrice(totalPrice)}</strong></p>
    `;
};

@Injectable()
export class OrderMailerService {
    private readonly from: string | undefined;
    private readonly logger = new Logger(OrderMailerService.name);
    private readonly recipient: string | undefined;
    private readonly transporter: ReturnType<typeof nodemailer.createTransport> | undefined;

    constructor(configService: ConfigService) {
        const host = configService.get<string>('SMTP_HOST')?.trim();
        const user = configService.get<string>('SMTP_USER')?.trim();
        const password = configService.get<string>('SMTP_PASSWORD');
        const recipient = configService.get<string>('ORDER_RECIPIENT_EMAIL')?.trim();
        const configuredPort = Number(configService.get<string>('SMTP_PORT'));
        const port =
            Number.isSafeInteger(configuredPort) && configuredPort > 0
                ? configuredPort
                : DEFAULT_SMTP_PORT;
        const secureSetting = configService.get<string>('SMTP_SECURE')?.trim().toLowerCase();
        const secure =
            secureSetting === 'true' || (secureSetting !== 'false' && port === DEFAULT_SMTP_PORT);

        this.from = configService.get<string>('MAIL_FROM')?.trim() || user;
        this.recipient = recipient;

        if (!host || !user || !password || !this.from || !recipient) {
            this.logger.warn(
                [
                    'Email delivery is not configured.',
                    'Set SMTP_HOST, SMTP_USER, SMTP_PASSWORD and ORDER_RECIPIENT_EMAIL.',
                ].join(' '),
            );
            return;
        }

        this.transporter = nodemailer.createTransport({
            auth: {
                pass: password,
                user,
            },
            host,
            port,
            secure,
        });
    }

    async sendOrder(order: OrderEmail) {
        if (!this.transporter || !this.from || !this.recipient) {
            throw new ServiceUnavailableException(
                'Отправка заказов временно недоступна. Позвоните нам по номеру +7 (962) 587-32-38',
            );
        }

        try {
            await this.transporter.sendMail({
                from: this.from,
                html: createHtmlBody(order),
                replyTo: order.email,
                subject: ORDER_EMAIL_SUBJECT,
                text: createTextBody(order),
                to: this.recipient,
            });
        } catch (error) {
            this.logger.error(
                'Failed to send order email',
                error instanceof Error ? error.stack : String(error),
            );

            throw new ServiceUnavailableException(
                [
                    'Не удалось отправить заказ.',
                    'Попробуйте ещё раз или позвоните нам по номеру +7 (962) 587-32-38',
                ].join(' '),
            );
        }
    }
}
