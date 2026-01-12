'use client';

import HeroSection from '@/components/home/HeroSection';

export default function HomePage() {
  return (
    <>
      <HeroSection />

      {/* Services Overview Section */}
      <section className="section">
        <div className="container">
          <div className="text-center" style={{ marginBottom: 'var(--space-3xl)' }}>
            <h2>Our Services</h2>
            <p style={{ maxWidth: '600px', margin: '0 auto', color: 'var(--color-neutral-600)' }}>
              Comprehensive roofing solutions for residential and commercial properties
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 'var(--space-xl)' }}>
            {[
              { title: 'Roof Repairs', desc: 'Fast and reliable repairs for all types of roofing damage' },
              { title: 'New Installations', desc: 'Complete roof installations with premium materials' },
              { title: 'Maintenance', desc: 'Regular inspections and preventive maintenance services' },
              { title: 'Emergency Services', desc: '24/7 emergency response for urgent roofing issues' },
            ].map((service, index) => (
              <div key={index} style={{
                padding: 'var(--space-xl)',
                background: 'var(--color-neutral-100)',
                borderRadius: 'var(--radius-lg)',
                transition: 'transform var(--transition-base), box-shadow var(--transition-base)',
                cursor: 'pointer',
              }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-8px)';
                  e.currentTarget.style.boxShadow = 'var(--shadow-xl)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = 'none';
                }}>
                <h3 style={{ fontSize: 'var(--font-size-xl)', marginBottom: 'var(--space-md)' }}>{service.title}</h3>
                <p style={{ color: 'var(--color-neutral-600)', marginBottom: 0 }}>{service.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Trust Badges */}
      <section style={{ background: 'var(--color-neutral-100)', padding: 'var(--space-3xl) 0' }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 'var(--space-2xl)', textAlign: 'center' }}>
            <div>
              <div style={{ fontSize: 'var(--font-size-5xl)', fontWeight: 'var(--font-weight-extrabold)', color: 'var(--color-primary)' }}>15+</div>
              <p style={{ fontSize: 'var(--font-size-lg)', color: 'var(--color-neutral-700)', marginBottom: 0 }}>Years Experience</p>
            </div>
            <div>
              <div style={{ fontSize: 'var(--font-size-5xl)', fontWeight: 'var(--font-weight-extrabold)', color: 'var(--color-primary)' }}>500+</div>
              <p style={{ fontSize: 'var(--font-size-lg)', color: 'var(--color-neutral-700)', marginBottom: 0 }}>Projects Completed</p>
            </div>
            <div>
              <div style={{ fontSize: 'var(--font-size-5xl)', fontWeight: 'var(--font-weight-extrabold)', color: 'var(--color-primary)' }}>100%</div>
              <p style={{ fontSize: 'var(--font-size-lg)', color: 'var(--color-neutral-700)', marginBottom: 0 }}>Satisfaction Rate</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section">
        <div className="container">
          <div style={{
            background: 'linear-gradient(135deg, var(--color-primary), var(--color-primary-dark))',
            borderRadius: 'var(--radius-xl)',
            padding: 'var(--space-4xl)',
            textAlign: 'center',
            color: 'var(--color-white)',
          }}>
            <h2 style={{ color: 'var(--color-white)', fontSize: 'var(--font-size-4xl)' }}>Ready to Get Started?</h2>
            <p style={{ fontSize: 'var(--font-size-xl)', marginBottom: 'var(--space-2xl)', color: 'rgba(255, 255, 255, 0.9)' }}>
              Get a free, no-obligation quote for your roofing project today
            </p>
            <a href="/contact" className="btn btn-accent btn-lg">Contact Us Now</a>
          </div>
        </div>
      </section>
    </>
  );
}
