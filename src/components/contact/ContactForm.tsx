'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import styles from './ContactForm.module.css';

const contactSchema = z.object({
    name: z.string().min(2, 'Name must be at least 2 characters'),
    email: z.string().email('Invalid email address'),
    phone: z.string().optional(),
    message: z.string().min(10, 'Message must be at least 10 characters'),
    honeypot: z.string().optional(),
});

type ContactFormData = z.infer<typeof contactSchema>;

export default function ContactForm() {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
    const [errorMessage, setErrorMessage] = useState('');

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm<ContactFormData>({
        resolver: zodResolver(contactSchema),
    });

    const onSubmit = async (data: ContactFormData) => {
        setIsSubmitting(true);
        setSubmitStatus('idle');
        setErrorMessage('');

        try {
            const response = await fetch('/api/contact', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data),
            });

            const result = await response.json();

            if (!response.ok) {
                throw new Error(result.error || 'Something went wrong');
            }

            setSubmitStatus('success');
            reset();
        } catch (error) {
            setSubmitStatus('error');
            setErrorMessage(error instanceof Error ? error.message : 'Failed to send message');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
            {/* Honeypot field - hidden from users */}
            <input
                type="text"
                {...register('honeypot')}
                className="visually-hidden"
                tabIndex={-1}
                autoComplete="off"
            />

            <div className="form-group">
                <label htmlFor="name" className="form-label">Name *</label>
                <input
                    id="name"
                    type="text"
                    {...register('name')}
                    className="form-input"
                    placeholder="Your name"
                />
                {errors.name && <p className="form-error">{errors.name.message}</p>}
            </div>

            <div className="form-group">
                <label htmlFor="email" className="form-label">Email *</label>
                <input
                    id="email"
                    type="email"
                    {...register('email')}
                    className="form-input"
                    placeholder="your.email@example.com"
                />
                {errors.email && <p className="form-error">{errors.email.message}</p>}
            </div>

            <div className="form-group">
                <label htmlFor="phone" className="form-label">Phone</label>
                <input
                    id="phone"
                    type="tel"
                    {...register('phone')}
                    className="form-input"
                    placeholder="07123 456789"
                />
                {errors.phone && <p className="form-error">{errors.phone.message}</p>}
            </div>

            <div className="form-group">
                <label htmlFor="message" className="form-label">Message *</label>
                <textarea
                    id="message"
                    {...register('message')}
                    className="form-textarea"
                    placeholder="Tell us about your roofing needs..."
                    rows={5}
                />
                {errors.message && <p className="form-error">{errors.message.message}</p>}
            </div>

            {submitStatus === 'success' && (
                <div className={styles.successMessage}>
                    Thank you for your message! We'll get back to you soon.
                </div>
            )}

            {submitStatus === 'error' && (
                <div className={styles.errorMessage}>
                    {errorMessage}
                </div>
            )}

            <button
                type="submit"
                className="btn btn-primary btn-lg"
                disabled={isSubmitting}
                style={{ width: '100%' }}
            >
                {isSubmitting ? 'Sending...' : 'Send Message'}
            </button>
        </form>
    );
}
