import Link from 'next/link';
import styles from './HeroSection.module.css';

export default function HeroSection() {
    return (
        <section className={styles.hero}>
            <div className="container">
                <div className={styles.heroContent}>
                    <h1 className={styles.heroTitle}>
                        Expert Roofing Services
                        <span className={styles.heroAccent}> Across the UK</span>
                    </h1>
                    <p className={styles.heroSubtitle}>
                        Professional roof repairs and installations with over 15 years of experience.
                        Quality workmanship, reliable service, and competitive prices guaranteed.
                    </p>
                    <div className={styles.heroButtons}>
                        <Link href="/contact" className="btn btn-primary btn-lg">
                            Get a Free Quote
                        </Link>
                        <Link href="/gallery" className="btn btn-outline btn-lg">
                            View Our Work
                        </Link>
                    </div>
                </div>
            </div>
            <div className={styles.heroOverlay}></div>
        </section>
    );
}
