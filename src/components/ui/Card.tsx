'use client';

import { motion } from 'framer-motion';
import { ReactNode } from 'react';
import styles from './Card.module.css';

interface CardProps {
    children: ReactNode;
    variant?: 'default' | 'glass' | 'gradient';
    hover?: boolean;
    className?: string;
    onClick?: () => void;
}

export default function Card({
    children,
    variant = 'default',
    hover = false,
    className = '',
    onClick,
}: CardProps) {
    const classNames = `${styles.card} ${styles[variant]} ${hover ? styles.hover : ''} ${className}`;

    return (
        <motion.div
            className={classNames}
            onClick={onClick}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.5 }}
            whileHover={hover ? { y: -8, transition: { duration: 0.2 } } : {}}
        >
            {children}
        </motion.div>
    );
}
