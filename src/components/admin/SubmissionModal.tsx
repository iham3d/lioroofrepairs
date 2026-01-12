'use client';

import { useEffect, useState } from 'react';
import { formatDate } from '@/lib/utils';
import type { ContactSubmission } from '@/types';
import styles from './SubmissionModal.module.css';

interface SubmissionModalProps {
    submission: ContactSubmission;
    onClose: () => void;
    onStatusUpdate: (id: number, status: string) => void;
}

export default function SubmissionModal({ submission, onClose, onStatusUpdate }: SubmissionModalProps) {
    const [status, setStatus] = useState(submission.status);

    useEffect(() => {
        const handleEscape = (e: KeyboardEvent) => {
            if (e.key === 'Escape') {
                onClose();
            }
        };

        document.addEventListener('keydown', handleEscape);
        document.body.style.overflow = 'hidden';

        return () => {
            document.removeEventListener('keydown', handleEscape);
            document.body.style.overflow = 'unset';
        };
    }, [onClose]);

    const handleBackdropClick = (e: React.MouseEvent) => {
        if (e.target === e.currentTarget) {
            onClose();
        }
    };

    const handleStatusChange = (newStatus: string) => {
        setStatus(newStatus as typeof status);
        onStatusUpdate(submission.id, newStatus);
    };

    const getStatusBadgeClass = (status: string) => {
        switch (status) {
            case 'NEW':
                return styles.new;
            case 'CONTACTED':
                return styles.contacted;
            case 'COMPLETED':
                return styles.completed;
            default:
                return '';
        }
    };

    return (
        <div className={styles.modalBackdrop} onClick={handleBackdropClick}>
            <div className={styles.modal}>
                <div className={styles.modalHeader}>
                    <h2 className={styles.modalTitle}>Submission Details</h2>
                    <button
                        onClick={onClose}
                        className={styles.closeButton}
                        aria-label="Close modal"
                    >
                        ×
                    </button>
                </div>

                <div className={styles.modalBody}>
                    <div className={styles.field}>
                        <label className={styles.fieldLabel}>Name</label>
                        <div className={styles.fieldValue}>{submission.name}</div>
                    </div>

                    <div className={styles.field}>
                        <label className={styles.fieldLabel}>Email</label>
                        <div className={styles.fieldValue}>
                            <a href={`mailto:${submission.email}`}>{submission.email}</a>
                        </div>
                    </div>

                    {submission.phone && (
                        <div className={styles.field}>
                            <label className={styles.fieldLabel}>Phone</label>
                            <div className={styles.fieldValue}>
                                <a href={`tel:${submission.phone}`}>{submission.phone}</a>
                            </div>
                        </div>
                    )}

                    <div className={styles.field}>
                        <label className={styles.fieldLabel}>Message</label>
                        <div className={`${styles.fieldValue} ${styles.messageBox}`}>
                            {submission.message}
                        </div>
                    </div>

                    <div className={styles.field}>
                        <label className={styles.fieldLabel}>Status</label>
                        <select
                            value={status}
                            onChange={(e) => handleStatusChange(e.target.value)}
                            className={styles.statusSelect}
                        >
                            <option value="NEW">New</option>
                            <option value="CONTACTED">Contacted</option>
                            <option value="COMPLETED">Completed</option>
                        </select>
                    </div>

                    <div className={styles.metadata}>
                        <div className={styles.metadataItem}>
                            <span className={styles.metadataLabel}>Submitted</span>
                            <span className={styles.metadataValue}>
                                {formatDate(submission.createdAt)}
                            </span>
                        </div>
                        <div className={styles.metadataItem}>
                            <span className={styles.metadataLabel}>Last Updated</span>
                            <span className={styles.metadataValue}>
                                {formatDate(submission.updatedAt)}
                            </span>
                        </div>
                    </div>
                </div>

                <div className={styles.modalFooter}>
                    <a
                        href={`mailto:${submission.email}`}
                        className={`${styles.actionButton} ${styles.primary}`}
                    >
                        📧 Send Email
                    </a>
                    {submission.phone && (
                        <a
                            href={`tel:${submission.phone}`}
                            className={`${styles.actionButton} ${styles.secondary}`}
                        >
                            📞 Call
                        </a>
                    )}
                </div>
            </div>
        </div>
    );
}
