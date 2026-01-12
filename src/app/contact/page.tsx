import type { Metadata } from 'next';
import ContactForm from '@/components/contact/ContactForm';

export const metadata: Metadata = {
    title: 'Contact Us | Lio Roof Repairs',
    description: 'Get in touch with Lio Roof Repairs for a free quote. Professional roofing services across the UK.',
};

export default function ContactPage() {
    return (
        <>
            <section className="section">
                <div className="container">
                    <div className="text-center" style={{ marginBottom: 'var(--space-4xl)' }}>
                        <h1>Get in Touch</h1>
                        <p style={{ fontSize: 'var(--font-size-lg)', color: 'var(--color-neutral-600)', maxWidth: '600px', margin: '0 auto' }}>
                            Ready to start your roofing project? Fill out the form below and we'll get back to you within 24 hours.
                        </p>
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 'var(--space-4xl)', marginBottom: 'var(--space-4xl)' }}>
                        <div>
                            <ContactForm />
                        </div>

                        <div>
                            <h2 style={{ fontSize: 'var(--font-size-2xl)', marginBottom: 'var(--space-xl)' }}>Contact Information</h2>

                            <div style={{ marginBottom: 'var(--space-xl)' }}>
                                <h3 style={{ fontSize: 'var(--font-size-lg)', marginBottom: 'var(--space-sm)' }}>Email</h3>
                                <p style={{ color: 'var(--color-neutral-700)' }}>
                                    <a href="mailto:info@lioroofrepairs.co.uk" style={{ color: 'var(--color-primary)' }}>
                                        info@lioroofrepairs.co.uk
                                    </a>
                                </p>
                            </div>

                            <div style={{ marginBottom: 'var(--space-xl)' }}>
                                <h3 style={{ fontSize: 'var(--font-size-lg)', marginBottom: 'var(--space-sm)' }}>Phone</h3>
                                <p style={{ color: 'var(--color-neutral-700)' }}>
                                    <a href="tel:08001234567" style={{ color: 'var(--color-primary)' }}>
                                        0800 123 4567
                                    </a>
                                </p>
                            </div>

                            <div style={{ marginBottom: 'var(--space-xl)' }}>
                                <h3 style={{ fontSize: 'var(--font-size-lg)', marginBottom: 'var(--space-sm)' }}>Hours</h3>
                                <p style={{ color: 'var(--color-neutral-700)', marginBottom: 'var(--space-xs)' }}>
                                    Monday - Friday: 8:00 AM - 6:00 PM
                                </p>
                                <p style={{ color: 'var(--color-neutral-700)', marginBottom: 'var(--space-xs)' }}>
                                    Saturday: 9:00 AM - 4:00 PM
                                </p>
                                <p style={{ color: 'var(--color-neutral-700)' }}>
                                    Sunday: Closed
                                </p>
                            </div>

                            <div>
                                <h3 style={{ fontSize: 'var(--font-size-lg)', marginBottom: 'var(--space-sm)' }}>Emergency Services</h3>
                                <p style={{ color: 'var(--color-neutral-700)' }}>
                                    24/7 emergency roofing services available. Call us anytime for urgent repairs.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}
