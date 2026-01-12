import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Customer Reviews | Lio Roof Repairs',
    description: 'Read what our customers say about our roofing services. 5-star rated roofing company.',
};

// Static reviews - can be replaced with Google Reviews API later
const reviews = [
    {
        id: 1,
        name: 'John Smith',
        location: 'Manchester',
        rating: 5,
        date: '2024-01-15',
        comment: 'Excellent service from start to finish. The team was professional, punctual, and did a fantastic job repairing our roof. Highly recommended!',
    },
    {
        id: 2,
        name: 'Sarah Johnson',
        location: 'Birmingham',
        rating: 5,
        date: '2024-01-10',
        comment: 'Very impressed with the quality of work. They completed our new roof installation on time and within budget. Great communication throughout.',
    },
    {
        id: 3,
        name: 'Michael Brown',
        location: 'Leeds',
        rating: 5,
        date: '2024-01-05',
        comment: 'Called them for an emergency repair and they came out the same day. Fixed the leak quickly and professionally. Couldn\'t ask for better service.',
    },
    {
        id: 4,
        name: 'Emma Wilson',
        location: 'Liverpool',
        rating: 5,
        date: '2023-12-20',
        comment: 'Outstanding workmanship and attention to detail. The team was friendly and left the site spotless. Will definitely use them again.',
    },
    {
        id: 5,
        name: 'David Taylor',
        location: 'Sheffield',
        rating: 5,
        date: '2023-12-15',
        comment: 'Great value for money. They provided a detailed quote and stuck to it. The roof looks amazing and we\'ve had no issues since.',
    },
    {
        id: 6,
        name: 'Lisa Anderson',
        location: 'Bristol',
        rating: 5,
        date: '2023-12-10',
        comment: 'Professional team who really know their stuff. They explained everything clearly and the work was completed to a very high standard.',
    },
];

function StarRating({ rating }: { rating: number }) {
    return (
        <div style={{ display: 'flex', gap: 'var(--space-xs)', color: 'var(--color-accent)' }}>
            {Array.from({ length: 5 }).map((_, i) => (
                <span key={i} style={{ fontSize: 'var(--font-size-lg)' }}>
                    {i < rating ? '★' : '☆'}
                </span>
            ))}
        </div>
    );
}

export default function ReviewsPage() {
    const averageRating = reviews.reduce((acc, review) => acc + review.rating, 0) / reviews.length;

    return (
        <>
            <section style={{ background: 'var(--color-neutral-100)', padding: 'var(--space-4xl) 0' }}>
                <div className="container text-center">
                    <h1>Customer Reviews</h1>
                    <div style={{ marginTop: 'var(--space-lg)' }}>
                        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 'var(--space-md)' }}>
                            <StarRating rating={Math.round(averageRating)} />
                            <span style={{ fontSize: 'var(--font-size-2xl)', fontWeight: 'var(--font-weight-bold)' }}>
                                {averageRating.toFixed(1)}
                            </span>
                        </div>
                        <p style={{ marginTop: 'var(--space-sm)', color: 'var(--color-neutral-600)' }}>
                            Based on {reviews.length} reviews
                        </p>
                    </div>
                </div>
            </section>

            <section className="section">
                <div className="container">
                    <div style={{ display: 'grid', gap: 'var(--space-xl)', maxWidth: '900px', margin: '0 auto' }}>
                        {reviews.map((review) => (
                            <div
                                key={review.id}
                                style={{
                                    padding: 'var(--space-xl)',
                                    background: 'var(--color-white)',
                                    borderRadius: 'var(--radius-lg)',
                                    boxShadow: 'var(--shadow-md)',
                                }}
                            >
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: 'var(--space-md)' }}>
                                    <div>
                                        <h3 style={{ fontSize: 'var(--font-size-lg)', marginBottom: 'var(--space-xs)' }}>
                                            {review.name}
                                        </h3>
                                        <p style={{ color: 'var(--color-neutral-600)', fontSize: 'var(--font-size-sm)', marginBottom: 0 }}>
                                            {review.location}
                                        </p>
                                    </div>
                                    <StarRating rating={review.rating} />
                                </div>
                                <p style={{ color: 'var(--color-neutral-700)', lineHeight: 'var(--line-height-relaxed)', marginBottom: 'var(--space-sm)' }}>
                                    "{review.comment}"
                                </p>
                                <p style={{ color: 'var(--color-neutral-500)', fontSize: 'var(--font-size-sm)', marginBottom: 0 }}>
                                    {new Date(review.date).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}
                                </p>
                            </div>
                        ))}
                    </div>

                    <div style={{ textAlign: 'center', marginTop: 'var(--space-4xl)' }}>
                        <a href="/contact" className="btn btn-primary btn-lg">
                            Leave Your Review
                        </a>
                    </div>
                </div>
            </section>
        </>
    );
}
