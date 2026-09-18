'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { z } from 'zod';

import { createOrder, type CreateOrderPayload, type OrderItemPayload } from '@/d-shared/api/orders';

import s from '../cart.module.scss';

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE_PATTERN = /^[\d\s()+-]+$/;
const MAX_EMAIL_LENGTH = 254;
const MAX_NAME_LENGTH = 100;
const MAX_PHONE_DIGITS = 15;
const MAX_PHONE_LENGTH = 40;
const MIN_PHONE_DIGITS = 7;

const orderFormSchema = z.object({
    email: z
        .string()
        .trim()
        .max(MAX_EMAIL_LENGTH, 'Электронная почта указана неверно')
        .refine((email) => email.length === 0 || EMAIL_PATTERN.test(email), {
            message: 'Электронная почта указана неверно',
        }),
    name: z
        .string()
        .trim()
        .min(1, 'Введите имя')
        .max(MAX_NAME_LENGTH, `Имя не должно быть длиннее ${MAX_NAME_LENGTH} символов`),
    phone: z
        .string()
        .trim()
        .min(1, 'Введите номер телефона')
        .max(MAX_PHONE_LENGTH, 'Номер телефона указан неверно')
        .refine(
            (phone) => {
                const digitsCount = phone.replace(/\D/g, '').length;

                return (
                    PHONE_PATTERN.test(phone) &&
                    digitsCount >= MIN_PHONE_DIGITS &&
                    digitsCount <= MAX_PHONE_DIGITS
                );
            },
            {
                message: 'Номер телефона указан неверно',
            },
        ),
});

type OrderFormData = z.infer<typeof orderFormSchema>;

type OrderFormProps = {
    hasUnavailableItems: boolean;
    items: OrderItemPayload[];
    onOrderCreated: () => void;
};

const OrderForm = ({ hasUnavailableItems, items, onOrderCreated }: OrderFormProps) => {
    const {
        formState: { errors },
        handleSubmit,
        register,
        reset,
    } = useForm<OrderFormData>({
        defaultValues: {
            email: '',
            name: '',
            phone: '',
        },
        mode: 'onBlur',
        resolver: zodResolver(orderFormSchema),
    });
    const { isPending, mutateAsync } = useMutation({
        mutationFn: createOrder,
    });

    const onSubmit = async (data: OrderFormData) => {
        const payload: CreateOrderPayload = {
            ...(data.email ? { email: data.email } : {}),
            items,
            name: data.name,
            phone: data.phone,
        };

        try {
            const response = await mutateAsync(payload);

            toast.success(response.message, {
                toastId: 'order-created',
            });
            reset();
            onOrderCreated();
        } catch (error) {
            toast.error(
                error instanceof Error
                    ? error.message
                    : 'Не удалось оформить заказ. Попробуйте ещё раз',
                {
                    toastId: 'order-create-error',
                },
            );
        }
    };

    const onInvalid = () => {
        toast.error('Проверьте обязательные поля формы', {
            toastId: 'order-validation-error',
        });
    };

    return (
        <section
            aria-labelledby={'order-form-title'}
            className={s['order']}
        >
            <div className={s['order-heading']}>
                <h2 id={'order-form-title'}>Оформление заказа</h2>
                <p>Оставьте имя и телефон. Консультант свяжется с вами для подтверждения заказа.</p>
            </div>
            {hasUnavailableItems && (
                <p
                    className={s['order-unavailable-message']}
                    role={'alert'}
                >
                    Удалите недоступные товары, чтобы оформить заказ.
                </p>
            )}
            <form
                className={s['order-form']}
                noValidate={true}
                onSubmit={handleSubmit(onSubmit, onInvalid)}
            >
                <div className={s['order-fields']}>
                    <div className={s['order-field']}>
                        <label htmlFor={'order-name'}>Имя *</label>
                        <input
                            aria-describedby={errors.name ? 'order-name-error' : undefined}
                            aria-invalid={Boolean(errors.name)}
                            autoComplete={'name'}
                            id={'order-name'}
                            type={'text'}
                            {...register('name')}
                        />
                        {errors.name?.message && (
                            <p
                                className={s['order-field-error']}
                                id={'order-name-error'}
                            >
                                {errors.name.message}
                            </p>
                        )}
                    </div>
                    <div className={s['order-field']}>
                        <label htmlFor={'order-phone'}>Номер телефона *</label>
                        <input
                            aria-describedby={errors.phone ? 'order-phone-error' : undefined}
                            aria-invalid={Boolean(errors.phone)}
                            autoComplete={'tel'}
                            id={'order-phone'}
                            inputMode={'tel'}
                            type={'tel'}
                            {...register('phone')}
                        />
                        {errors.phone?.message && (
                            <p
                                className={s['order-field-error']}
                                id={'order-phone-error'}
                            >
                                {errors.phone.message}
                            </p>
                        )}
                    </div>
                    <div className={s['order-field']}>
                        <label htmlFor={'order-email'}>Электронная почта (необязательно)</label>
                        <input
                            aria-describedby={errors.email ? 'order-email-error' : undefined}
                            aria-invalid={Boolean(errors.email)}
                            autoComplete={'email'}
                            id={'order-email'}
                            inputMode={'email'}
                            type={'email'}
                            {...register('email')}
                        />
                        {errors.email?.message && (
                            <p
                                className={s['order-field-error']}
                                id={'order-email-error'}
                            >
                                {errors.email.message}
                            </p>
                        )}
                    </div>
                </div>
                <button
                    aria-busy={isPending}
                    className={s['order-submit-button']}
                    disabled={isPending || hasUnavailableItems}
                    type={'submit'}
                >
                    {isPending ? 'Отправляем заказ…' : 'Оформить заказ'}
                </button>
            </form>
        </section>
    );
};

export default OrderForm;
