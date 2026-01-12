'use client';

import HeroSection from '@/components/home/HeroSection';
import Button from '@/components/ui/Button';
import Card from '@/components/ui/Card';
import AnimatedCounter from '@/components/ui/AnimatedCounter';
import { motion } from 'framer-motion';

const services = [
  {
    title: 'Roof Repairs',
    desc: 'Fast and reliable repairs for all types of roofing damage',
    icon: '🔧',
  },
  {
    title: 'New Installations',
    desc: 'Complete roof installations with premium materials',
    icon: '🏗️',
  },
  {
    title: 'Maintenance',
    desc: 'Regular inspections and preventive maintenance services',
    icon: '🛠️',
  },
  {
    title: 'Emergency Services',
    desc: '24/7 emergency response for urgent roofing issues',
    icon: '🚨',
  },
  {
    title: 'Guttering',
    desc: 'Professional gutter installation, repair, and cleaning',
    icon: '💧',
  },
  {
    title: 'Fascias & Soffits',
    desc: 'Expert installation and replacement services',
    icon: '🏠',
  },
];

export default function HomePage() {
  return (
    <>
      <HeroSection />

      {/* Services Overview Section */}
      <section className="section">
        <div className="container">
          <motion.div
            className="text-center"
            style={{ marginBottom: 'var(--space-3xl)' }}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2>Our Services</h2>
            <p style={{ maxWidth: '600px', margin: '0 auto', color: 'var(--color-neutral-600)' }}>
              Comprehensive roofing solutions for residential and commercial properties
            </p>
          </motion.div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
              gap: 'var(--space-xl)',
            }}
          >
            {services.map((service, index) => (
              <Card key={index} hover>
                <div style={{ textAlign: 'center' }}>
                  <div
                    style={{
                      fontSize: '3rem',
                      marginBottom: 'var(--space-md)',
                    }}
                  >
                    {service.icon}
                  </div>
                  <h3 style={{ fontSize: 'var(--font-size-xl)', marginBottom: 'var(--space-md)' }}>
                    {service.title}
                  </h3>
                  <p style={{ color: 'var(--color-neutral-600)', marginBottom: 0 }}>{service.desc}</p>
                </div>
              </Card>
            ))}
          </div>

          <motion.div
            style={{ textAlign: 'center', marginTop: 'var(--space-3xl)' }}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
          >
            <Button href="/services" variant="primary" size="lg">
              View All Services
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Trust Badges with Animated Counters */}
      <section style={{ background: 'var(--gradient-hero)', padding: 'var(--space-4xl) 0', color: 'var(--color-white)' }}>
        <div className="container">
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
              gap: 'var(--space-3xl)',
              textAlign: 'center',
            }}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <div
                style={{
                  fontSize: 'var(--font-size-5xl)',
                  fontWeight: 'var(--font-weight-extrabold)',
                  marginBottom: 'var(--space-sm)',
                }}
              >
                <AnimatedCounter end={15} suffix="+" />
              </div>
              <p style={{ fontSize: 'var(--font-size-lg)', marginBottom: 0, opacity: 0.9 }}>
                Years Experience
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <div
                style={{
                  fontSize: 'var(--font-size-5xl)',
                  fontWeight: 'var(--font-weight-extrabold)',
                  marginBottom: 'var(--space-sm)',
                }}
              >
                <AnimatedCounter end={500} suffix="+" />
              </div>
              <p style={{ fontSize: 'var(--font-size-lg)', marginBottom: 0, opacity: 0.9 }}>
                Projects Completed
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <div
                style={{
                  fontSize: 'var(--font-size-5xl)',
                  fontWeight: 'var(--font-weight-extrabold)',
                  marginBottom: 'var(--space-sm)',
                }}
              >
                <AnimatedCounter end={100} suffix="%" />
              </div>
              <p style={{ fontSize: 'var(--font-size-lg)', marginBottom: 0, opacity: 0.9 }}>
                Satisfaction Rate
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="section">
        <div className="container">
          <motion.div
            className="text-center"
            style={{ marginBottom: 'var(--space-3xl)' }}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2>Why Choose Lio Roof Repairs?</h2>
            <p style={{ maxWidth: '700px', margin: '0 auto', color: 'var(--color-neutral-600)' }}>
              Professional roofing services backed by years of experience and a commitment to excellence
            </p>
          </motion.div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
              gap: 'var(--space-2xl)',
            }}
          >
            {[
              { title: 'Expert Craftsmanship', desc: 'Highly skilled professionals with 15+ years of experience', icon: '⭐' },
              { title: 'Quality Materials', desc: 'We use only premium, long-lasting roofing materials', icon: '🏆' },
              { title: 'Competitive Pricing', desc: 'Fair, transparent pricing with no hidden costs', icon: '💰' },
              { title: 'Guaranteed Work', desc: 'All work comes with comprehensive warranties', icon: '✅' },
            ].map((feature, index) => (
              <Card key={index}>
                <div style={{ fontSize: '2.5rem', marginBottom: 'var(--space-md)' }}>{feature.icon}</div>
                <h3 style={{ fontSize: 'var(--font-size-lg)', marginBottom: 'var(--space-sm)' }}>
                  {feature.title}
                </h3>
                <p style={{ color: 'var(--color-neutral-600)', marginBottom: 0, fontSize: 'var(--font-size-sm)' }}>
                  {feature.desc}
                </p>
              </Card>
            ))}
          </div>
        </div>
      </section>


      {/* Gallery Preview Section */}
      <section style={{ background: 'var(--color-neutral-50)', padding: 'var(--space-4xl) 0' }}>
        <div className="container">
          <motion.div
            className="text-center"
            style={{ marginBottom: 'var(--space-3xl)' }}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2>Our Recent Projects</h2>
            <p style={{ maxWidth: '700px', margin: '0 auto', color: 'var(--color-neutral-600)' }}>
              Take a look at some of our completed roofing projects across the UK
            </p>
          </motion.div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
              gap: 'var(--space-lg)',
            }}
          >
            {[
              { title: 'Residential Roof Repair', location: 'Manchester', image: '🏠' },
              { title: 'Commercial Installation', location: 'London', image: '🏢' },
              { title: 'Emergency Repair', location: 'Birmingham', image: '⚡' },
              { title: 'Gutter Replacement', location: 'Leeds', image: '💧' },
            ].map((project, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -8 }}
                style={{
                  background: 'var(--color-white)',
                  borderRadius: 'var(--radius-lg)',
                  overflow: 'hidden',
                  boxShadow: '0 4px 12px rgba(0, 0, 0, 0.08)',
                  cursor: 'pointer',
                  transition: 'all var(--transition-base)',
                }}
              >
                <div
                  style={{
                    height: '200px',
                    background: 'var(--gradient-primary)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '4rem',
                  }}
                >
                  {project.image}
                </div>
                <div style={{ padding: 'var(--space-lg)' }}>
                  <h3 style={{ fontSize: 'var(--font-size-lg)', marginBottom: 'var(--space-xs)' }}>
                    {project.title}
                  </h3>
                  <p style={{ color: 'var(--color-neutral-600)', fontSize: 'var(--font-size-sm)', marginBottom: 0 }}>
                    📍 {project.location}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div
            style={{ textAlign: 'center', marginTop: 'var(--space-3xl)' }}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            <Button href="/gallery" variant="primary" size="lg">
              View Full Gallery
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Reviews Section */}
      <section className="section">
        <div className="container">
          <motion.div
            className="text-center"
            style={{ marginBottom: 'var(--space-3xl)' }}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2>What Our Customers Say</h2>
            <p style={{ maxWidth: '700px', margin: '0 auto', color: 'var(--color-neutral-600)' }}>
              Don't just take our word for it - hear from our satisfied customers
            </p>
          </motion.div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
              gap: 'var(--space-xl)',
            }}
          >
            {[
              {
                name: 'Sarah Johnson',
                location: 'Manchester',
                rating: 5,
                text: 'Excellent service from start to finish. The team was professional, efficient, and the quality of work was outstanding.',
              },
              {
                name: 'Michael Brown',
                location: 'London',
                rating: 5,
                text: 'Very impressed with the emergency repair service. They responded quickly and fixed our roof leak the same day!',
              },
              {
                name: 'Emma Wilson',
                location: 'Birmingham',
                rating: 5,
                text: 'Great value for money and fantastic workmanship. Would definitely recommend to anyone needing roofing work.',
              },
            ].map((review, index) => (
              <Card key={index}>
                <div style={{ marginBottom: 'var(--space-md)' }}>
                  <div style={{ display: 'flex', gap: '4px', marginBottom: 'var(--space-sm)' }}>
                    {[...Array(review.rating)].map((_, i) => (
                      <span key={i} style={{ color: 'var(--color-accent)', fontSize: '1.25rem' }}>
                        ⭐
                      </span>
                    ))}
                  </div>
                  <p style={{ fontSize: 'var(--font-size-base)', lineHeight: 1.6, marginBottom: 'var(--space-md)', fontStyle: 'italic' }}>
                    "{review.text}"
                  </p>
                </div>
                <div style={{ borderTop: '1px solid var(--color-neutral-200)', paddingTop: 'var(--space-md)' }}>
                  <p style={{ fontWeight: 600, marginBottom: '4px' }}>{review.name}</p>
                  <p style={{ fontSize: 'var(--font-size-sm)', color: 'var(--color-neutral-600)', marginBottom: 0 }}>
                    📍 {review.location}
                  </p>
                </div>
              </Card>
            ))}
          </div>

          <motion.div
            style={{ textAlign: 'center', marginTop: 'var(--space-3xl)' }}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            <Button href="/reviews" variant="primary" size="lg">
              Read More Reviews
            </Button>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section">
        <div className="container">
          <motion.div
            style={{
              background: 'var(--gradient-hero)',
              borderRadius: 'var(--radius-xl)',
              padding: 'var(--space-4xl)',
              textAlign: 'center',
              color: 'var(--color-white)',
              position: 'relative',
              overflow: 'hidden',
            }}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 style={{ color: 'var(--color-white)', fontSize: 'var(--font-size-4xl)', marginBottom: 'var(--space-md)' }}>
              Ready to Get Started?
            </h2>
            <p
              style={{
                fontSize: 'var(--font-size-xl)',
                marginBottom: 'var(--space-2xl)',
                color: 'rgba(255, 255, 255, 0.9)',
                maxWidth: '600px',
                margin: '0 auto var(--space-2xl)',
              }}
            >
              Get a free, no-obligation quote for your roofing project today
            </p>
            <div style={{ display: 'flex', gap: 'var(--space-md)', justifyContent: 'center', flexWrap: 'wrap' }}>
              <Button href="/contact" variant="accent" size="lg">
                Get Free Quote
              </Button>
              <Button href="/services" variant="outline" size="lg">
                Our Services
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
}
