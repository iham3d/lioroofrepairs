import Link from 'next/link';
import styles from './Footer.module.css';

export default function Footer() {
    const currentYear = new Date().getFullYear();

    return (
        <footer className={styles.footer}>
            <div className="container">
                <div className={styles.footerContent}>
                    <div className={styles.footerSection}>
                        <h3 className={styles.footerTitle}>Lio Roof Repairs</h3>
                        <p className={styles.footerText}>
                            Professional roofing services across the UK. Quality workmanship, reliable service, and competitive prices.
                        </p>
                    </div>

                    <div className={styles.footerSection}>
                        <h4 className={styles.footerTitle}>Quick Links</h4>
                        <nav className={styles.footerNav}>
                            <Link href="/services" className={styles.footerLink}>Services</Link>
                            <Link href="/gallery" className={styles.footerLink}>Gallery</Link>
                            <Link href="/reviews" className={styles.footerLink}>Reviews</Link>
                            <Link href="/contact" className={styles.footerLink}>Contact</Link>
                        </nav>
                    </div>

                    <div className={styles.footerSection}>
                        <h4 className={styles.footerTitle}>Contact</h4>
                        <div className={styles.contactInfo}>
                            <p className={styles.footerText}>
                                <strong>Email:</strong> info@lioroofrepairs.co.uk
                            </p>
                            <p className={styles.footerText}>
                                <strong>Phone:</strong> 0800 123 4567
                            </p>
                        </div>
                    </div>
                </div>

                <div className={styles.footerBottom}>
                    <p className={styles.copyright}>
                        © {currentYear} Lio Roof Repairs. All rights reserved.
                    </p>
                </div>
            </div>
        </footer>
    );
}
