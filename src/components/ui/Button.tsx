'use client';

import { motion } from 'framer-motion';
import styles from './Button.module.css';

interface ButtonProps {
    children: React.ReactNode;
    variant?: 'primary' | 'secondary' | 'accent' | 'outline';
    size?: 'sm' | 'md' | 'lg';
    href?: string;
    onClick?: () => void;
    className?: string;
    disabled?: boolean;
}

export default function Button({
    children,
    variant = 'primary',
    size = 'md',
    href,
    onClick,
    className = '',
    disabled = false,
}: ButtonProps) {
    const classNames = `${styles.button} ${styles[variant]} ${styles[size]} ${className}`;

    const buttonContent = (
        <motion.button
            className={classNames}
            onClick={onClick}
            disabled={disabled}
            whileHover={{ scale: disabled ? 1 : 1.05 }}
            whileTap={{ scale: disabled ? 1 : 0.95 }}
            transition={{ type: 'spring', stiffness: 400, damping: 17 }}
        >
            {children}
        </motion.button>
    );

    if (href && !disabled) {
        return (
            <a href={href} style={{ textDecoration: 'none' }}>
                {buttonContent}
            </a>
        );
    }

    return buttonContent;
}
