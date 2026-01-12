'use client';

import { useState } from 'react';
import Toast, { ToastProps } from './Toast';
import styles from './Toast.module.css';

interface ToastItem extends Omit<ToastProps, 'onClose'> {
    id: string;
}

export function useToast() {
    const [toasts, setToasts] = useState<ToastItem[]>([]);

    const addToast = (toast: Omit<ToastItem, 'id'>) => {
        const id = Math.random().toString(36).substring(7);
        setToasts((prev) => [...prev, { ...toast, id }]);
    };

    const removeToast = (id: string) => {
        setToasts((prev) => prev.filter((toast) => toast.id !== id));
    };

    const ToastContainer = () => (
        <div className={styles.toastContainer}>
            {toasts.map((toast) => (
                <Toast key={toast.id} {...toast} onClose={removeToast} />
            ))}
        </div>
    );

    return { addToast, ToastContainer };
}
