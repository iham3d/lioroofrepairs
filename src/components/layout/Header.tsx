import Link from 'next/link';
import styles from './Header.module.css';

export default function Header() {
    return (
        <header className={styles.header}>
            <div className="container">
                <div className={styles.headerContent}>
                    <Link href="/" className={styles.logo}>
                        <span className={styles.logoText}>Lio Roof Repairs</span>
                    </Link>

                    <nav className={styles.nav}>
                        <Link href="/" className={styles.navLink}>Home</Link>
                        <Link href="/services" className={styles.navLink}>Services</Link>
                        <Link href="/gallery" className={styles.navLink}>Gallery</Link>
                        <Link href="/reviews" className={styles.navLink}>Reviews</Link>
                        <Link href="/contact" className={styles.navLink}>Contact</Link>
                    </nav>

                    <Link href="/contact" className="btn btn-primary">
                        Get a Quote
                    </Link>
                </div>
            </div>
        </header>
    );
}
