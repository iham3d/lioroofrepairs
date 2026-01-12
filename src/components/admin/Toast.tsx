'use client';

import { useEffect, useState } from 'react';
import styles from './Toast.module.css';

export interface ToastProps {
    id: string;
    type: 'success' | 'error' | 'info' | 'warning';
    title: string;
    message?: string;
    duration?: number;
    onClose: (id: string) => void;
}

export default function Toast({ id, type, title, message, duration = 3000, onClose }: ToastProps) {
    const [isExiting, setIsExiting] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => {
            handleClose();
        }, duration);

        return () => clearTimeout(timer);
    }, [duration]);

    const handleClose = () => {
        setIsExiting(true);
        setTimeout(() => {
            onClose(id);
        }, 300); // Match animation duration
    };

    const icons = {
        success: '✓',
        error: '✕',
        info: 'ℹ',
        warning: '⚠',
    };

    return (
        <div className={`${styles.toast} ${styles[type]} ${isExiting ? styles.toastExit : ''}`}>
            <div className={styles.toastIcon}>{icons[type]}</div>
            <div className={styles.toastContent}>
                <p className={styles.toastTitle}>{title}</p>
                {message && <p className={styles.toastMessage}>{message}</p>}
            </div>
            <button
                onClick={handleClose}
                className={styles.toastClose}
                aria-label="Close notification"
            >
                ×
            </button>
        </div>
    );
}
