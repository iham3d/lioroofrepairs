import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Our Services | Lio Roof Repairs',
    description: 'Comprehensive roofing services including repairs, installations, maintenance, and emergency services across the UK.',
};

const services = [
    {
        title: 'Roof Repairs',
        description: 'Expert repairs for all types of roofing damage including leaks, missing tiles, and storm damage.',
        features: [
            'Leak detection and repair',
            'Tile and slate replacement',
            'Storm damage restoration',
            'Chimney repairs',
        ],
    },
    {
        title: 'New Roof Installations',
        description: 'Complete roof installations using premium materials and expert craftsmanship.',
        features: [
            'Pitched and flat roofs',
            'Tile, slate, and felt roofing',
            'Full project management',
            '10-year workmanship guarantee',
        ],
    },
    {
        title: 'Roof Maintenance',
        description: 'Regular maintenance services to extend the life of your roof and prevent costly repairs.',
        features: [
            'Annual inspections',
            'Gutter cleaning',
            'Moss and debris removal',
            'Preventive maintenance plans',
        ],
    },
    {
        title: 'Emergency Roofing',
        description: '24/7 emergency response for urgent roofing issues that can\'t wait.',
        features: [
            'Rapid response team',
            'Temporary weatherproofing',
            'Storm damage repairs',
            'Available day and night',
        ],
    },
    {
        title: 'Guttering Services',
        description: 'Complete guttering solutions including installation, repairs, and maintenance.',
        features: [
            'Gutter installation',
            'Gutter repairs',
            'Downpipe replacement',
            'Gutter cleaning',
        ],
    },
    {
        title: 'Fascias & Soffits',
        description: 'Professional installation and repair of fascias and soffits to protect your roofline.',
        features: [
            'UPVC fascias and soffits',
            'Replacement and repairs',
            'Color-matched solutions',
            'Ventilation installation',
        ],
    },
];

export default function ServicesPage() {
    return (
        <>
            <section style={{ background: 'var(--color-neutral-100)', padding: 'var(--space-4xl) 0' }}>
                <div className="container text-center">
                    <h1>Our Services</h1>
                    <p style={{ fontSize: 'var(--font-size-lg)', color: 'var(--color-neutral-600)', maxWidth: '700px', margin: '0 auto' }}>
                        Comprehensive roofing solutions for residential and commercial properties across the UK
                    </p>
                </div>
            </section>

            <section className="section">
                <div className="container">
                    <div style={{ display: 'grid', gap: 'var(--space-3xl)' }}>
                        {services.map((service, index) => (
                            <div
                                key={index}
                                style={{
                                    display: 'grid',
                                    gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
                                    gap: 'var(--space-2xl)',
                                    padding: 'var(--space-2xl)',
                                    background: 'var(--color-white)',
                                    borderRadius: 'var(--radius-lg)',
                                    boxShadow: 'var(--shadow-md)',
                                }}
                            >
                                <div>
                                    <h2 style={{ fontSize: 'var(--font-size-3xl)', marginBottom: 'var(--space-md)' }}>
                                        {service.title}
                                    </h2>
                                    <p style={{ color: 'var(--color-neutral-700)', fontSize: 'var(--font-size-lg)' }}>
                                        {service.description}
                                    </p>
                                </div>
                                <div>
                                    <h3 style={{ fontSize: 'var(--font-size-lg)', marginBottom: 'var(--space-md)' }}>
                                        What's Included:
                                    </h3>
                                    <ul style={{ listStyle: 'none', padding: 0 }}>
                                        {service.features.map((feature, fIndex) => (
                                            <li
                                                key={fIndex}
                                                style={{
                                                    padding: 'var(--space-sm) 0',
                                                    color: 'var(--color-neutral-700)',
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    gap: 'var(--space-sm)',
                                                }}
                                            >
                                                <span style={{ color: 'var(--color-primary)', fontWeight: 'bold' }}>✓</span>
                                                {feature}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div style={{ textAlign: 'center', marginTop: 'var(--space-4xl)' }}>
                        <a href="/contact" className="btn btn-primary btn-lg">
                            Request a Free Quote
                        </a>
                    </div>
                </div>
            </section>
        </>
    );
}
