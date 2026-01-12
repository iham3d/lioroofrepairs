import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Gallery | Lio Roof Repairs',
    description: 'View our portfolio of completed roofing projects. Quality workmanship across the UK.',
};

export default function GalleryPage() {
    // Placeholder images - will be replaced with actual gallery images
    const placeholderImages = Array.from({ length: 12 }, (_, i) => ({
        id: i + 1,
        category: ['Repairs', 'Installations', 'Maintenance'][i % 3],
    }));

    return (
        <>
            <section style={{ background: 'var(--color-neutral-100)', padding: 'var(--space-4xl) 0' }}>
                <div className="container text-center">
                    <h1>Our Work</h1>
                    <p style={{ fontSize: 'var(--font-size-lg)', color: 'var(--color-neutral-600)', maxWidth: '700px', margin: '0 auto' }}>
                        Browse our portfolio of completed roofing projects
                    </p>
                </div>
            </section>

            <section className="section">
                <div className="container">
                    <div style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
                        gap: 'var(--space-lg)',
                    }}>
                        {placeholderImages.map((image) => (
                            <div
                                key={image.id}
                                className="gallery-item"
                                style={{
                                    aspectRatio: '4/3',
                                    background: 'var(--color-neutral-200)',
                                    borderRadius: 'var(--radius-lg)',
                                    overflow: 'hidden',
                                    position: 'relative',
                                    cursor: 'pointer',
                                    transition: 'transform var(--transition-base)',
                                }}
                            >
                                <div style={{
                                    position: 'absolute',
                                    bottom: 0,
                                    left: 0,
                                    right: 0,
                                    padding: 'var(--space-md)',
                                    background: 'linear-gradient(to top, rgba(0,0,0,0.7), transparent)',
                                    color: 'white',
                                }}>
                                    <p style={{ margin: 0, fontWeight: 'var(--font-weight-semibold)' }}>
                                        {image.category} Project #{image.id}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div style={{
                        textAlign: 'center',
                        marginTop: 'var(--space-4xl)',
                        padding: 'var(--space-2xl)',
                        background: 'var(--color-neutral-100)',
                        borderRadius: 'var(--radius-lg)',
                    }}>
                        <p style={{ fontSize: 'var(--font-size-lg)', color: 'var(--color-neutral-700)', marginBottom: 'var(--space-lg)' }}>
                            Gallery images will be added here. Place your project photos in <code>/public/images/gallery/</code>
                        </p>
                    </div>
                </div>
            </section>
        </>
    );
}
