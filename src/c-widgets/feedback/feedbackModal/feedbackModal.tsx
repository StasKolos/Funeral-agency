'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import axios from 'axios';
import classNames from 'classnames';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { z } from 'zod';
import s from './feedbackModal.module.scss';

const EMAILJS_CONFIG = {
    SERVICE_ID: 'service_bkpd96q',
    TEMPLATE_ID: 'template_up2txpj',
    PUBLIC_KEY: '4kDSV40TxgJdfBeuI',
};

const feedbackSchema = z.object({
    fullName: z.string().min(1, 'ФИО обязательно для заполнения'),
    email: z.string().email('Некорректный email адрес'),
    phoneNumber: z.string().min(1, 'Номер телефона обязателен для заполнения'),
    question: z.string(),
});

type FeedbackFormData = z.infer<typeof feedbackSchema>;

interface FeedbackModalProps {
    isOpen: boolean;
    handleClose: () => void;
}

const FeedbackModal = ({ isOpen, handleClose }: FeedbackModalProps) => {
    const [ isLoading, setIsLoading ] = useState<boolean>(false);

    const {
        register,
        handleSubmit,
        formState: { errors },
        watch,
    } = useForm<FeedbackFormData>({
        resolver: zodResolver(feedbackSchema),
        defaultValues: {
            fullName: '',
            email: '',
            phoneNumber: '',
            question: '',
        },
        mode: 'all',
    });

    const formValues = watch();

    const isFieldFilled = (fieldName: keyof FeedbackFormData) => formValues[fieldName] && formValues[fieldName].trim().length > 0;

    const onSubmit = async(data: FeedbackFormData) => {
        try {
            setIsLoading(true);

            const requestData = {
                service_id: EMAILJS_CONFIG.SERVICE_ID,
                template_id: EMAILJS_CONFIG.TEMPLATE_ID,
                user_id: EMAILJS_CONFIG.PUBLIC_KEY,
                template_params: {
                    fullName: data.fullName,
                    email: data.email,
                    phoneNumber: data.phoneNumber,
                    question: data.question,
                    reply_from: data.email,
                },
            };

            await axios.post(
                'https://api.emailjs.com/api/v1.0/email/send',
                requestData,
                {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                },
            );

            toast.success('Форма успешно отправлена! Мы свяжемся с вами в ближайшее время.');
        } catch (error: any) {
            toast.error('Произошла непредвиденная ошибка. Обратитесь к нам по указанному номеру телефона!');
        } finally {
            setIsLoading(false);
            handleClose();
        }
    };

    return (
        <>
            <section
                className={classNames(s['modal'], {
                    [s['modal-is-closed']]: !isOpen,
                })}
            >
                <h3>
                    Задайте вопрос
                    <br/>
                    Наш оператор свяжется с вами
                </h3>
                <form
                    className={s['form']}
                    onSubmit={handleSubmit(onSubmit)}
                >
                    <div
                        className={classNames(s['full-name-field'], s['field'], {
                            [s['field-filled']]: isFieldFilled('fullName'),
                        })}
                    >
                        <label
                            htmlFor={'fullName'}
                        >
                            ФИО *
                        </label>
                        <input
                            id={'fullName'}
                            type={'text'}
                            {...register('fullName')}
                        />
                        {
                            errors.fullName?.message &&
                            <ul>
                                <li>
                                    {errors.fullName?.message}
                                </li>
                            </ul>
                        }
                    </div>
                    <div
                        className={classNames(s['email-field'], s['field'], {
                            [s['field-filled']]: isFieldFilled('email'),
                        })}
                    >
                        <label
                            htmlFor={'email'}
                        >
                            Email *
                        </label>
                        <input
                            id={'email'}
                            type={'email'}
                            {...register('email')}
                        />
                        {
                            errors.email?.message &&
                            <ul>
                                <li>
                                    {errors.email?.message}
                                </li>
                            </ul>
                        }
                    </div>
                    <div
                        className={classNames(s['phone-number-field'], s['field'], {
                            [s['field-filled']]: isFieldFilled('phoneNumber'),
                        })}
                    >
                        <label
                            htmlFor={'phoneNumber'}
                        >
                            Номер телефона *
                        </label>
                        <input
                            id={'phoneNumber'}
                            type={'tel'}
                            {...register('phoneNumber')}
                        />
                        {
                            errors.phoneNumber?.message &&
                            <ul>
                                <li>
                                    {errors.phoneNumber?.message}
                                </li>
                            </ul>
                        }
                    </div>
                    <div
                        className={classNames(s['question-field'], s['field'], {
                            [s['field-filled']]: isFieldFilled('question'),
                        })}
                    >
                        <label
                            htmlFor={'question'}
                        >
                            Какой вопрос вас интересует ?
                        </label>
                        <textarea
                            id={'question'}
                            rows={5}
                            {...register('question')}
                        />
                        {
                            errors.question?.message &&
                            <ul>
                                <li>
                                    {errors.question?.message}
                                </li>
                            </ul>
                        }
                    </div>
                    <button
                        className={classNames(s['submit-button'], {
                            [s['submit-button-loading']]: isLoading,
                        })}
                        type={'submit'}
                    >
                        Отправить
                    </button>
                </form>
            </section>
            <div
                className={classNames(s['background-opacity'], {
                    [s['background-opacity--active']]: isOpen,
                })}
                onClick={handleClose}
            />
        </>
    );
};

export default FeedbackModal;
