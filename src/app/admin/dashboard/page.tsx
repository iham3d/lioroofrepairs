'use client';

import { useEffect, useState } from 'react';
import { signOut } from 'next-auth/react';
import { formatDate } from '@/lib/utils';
import type { ContactSubmission } from '@/types';
import DashboardStats from '@/components/admin/DashboardStats';
import Pagination from '@/components/admin/Pagination';
import SubmissionModal from '@/components/admin/SubmissionModal';
import { useToast } from '@/components/admin/useToast';
import styles from './Dashboard.module.css';

export default function AdminDashboard() {
    const [submissions, setSubmissions] = useState<ContactSubmission[]>([]);
    const [loading, setLoading] = useState(true);
    const [filter, setFilter] = useState('');
    const [statusFilter, setStatusFilter] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(20);
    const [totalItems, setTotalItems] = useState(0);
    const [selectedSubmission, setSelectedSubmission] = useState<ContactSubmission | null>(null);
    const { addToast, ToastContainer } = useToast();

    useEffect(() => {
        fetchSubmissions();
    }, [statusFilter, currentPage, itemsPerPage]);

    const fetchSubmissions = async () => {
        try {
            const params = new URLSearchParams();
            if (statusFilter) params.append('status', statusFilter);
            if (filter) params.append('search', filter);
            params.append('page', currentPage.toString());
            params.append('limit', itemsPerPage.toString());

            const response = await fetch(`/api/admin/submissions?${params}`);
            const data = await response.json();
            setSubmissions(data.submissions || []);
            setTotalItems(data.pagination?.total || 0);
        } catch (error) {
            console.error('Error fetching submissions:', error);
            addToast({
                type: 'error',
                title: 'Error',
                message: 'Failed to fetch submissions',
            });
        } finally {
            setLoading(false);
        }
    };

    const updateStatus = async (id: number, status: string) => {
        try {
            const response = await fetch(`/api/admin/submissions/${id}`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ status }),
            });

            if (response.ok) {
                fetchSubmissions();
                addToast({
                    type: 'success',
                    title: 'Status Updated',
                    message: `Submission marked as ${status.toLowerCase()}`,
                });
            } else {
                throw new Error('Failed to update status');
            }
        } catch (error) {
            console.error('Error updating status:', error);
            addToast({
                type: 'error',
                title: 'Error',
                message: 'Failed to update status',
            });
        }
    };

    const handleSearch = (value: string) => {
        setFilter(value);
        setCurrentPage(1);
        // Debounce search
        const timer = setTimeout(() => {
            fetchSubmissions();
        }, 500);
        return () => clearTimeout(timer);
    };

    const filteredSubmissions = submissions.filter((sub) =>
        sub.name.toLowerCase().includes(filter.toLowerCase()) ||
        sub.email.toLowerCase().includes(filter.toLowerCase()) ||
        sub.message.toLowerCase().includes(filter.toLowerCase())
    );

    const totalPages = Math.ceil(totalItems / itemsPerPage);

    const getStatusClass = (status: string) => {
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
        <div className={styles.dashboard}>
            <div className="container">
                <div className={styles.header}>
                    <h1 className={styles.title}>Dashboard</h1>
                    <button onClick={() => signOut()} className="btn btn-outline">
                        Sign Out
                    </button>
                </div>

                <DashboardStats />

                <div className={styles.filters}>
                    <input
                        type="text"
                        placeholder="Search submissions..."
                        value={filter}
                        onChange={(e) => handleSearch(e.target.value)}
                        className={`form-input ${styles.searchInput}`}
                    />

                    <select
                        value={statusFilter}
                        onChange={(e) => {
                            setStatusFilter(e.target.value);
                            setCurrentPage(1);
                        }}
                        className="form-select"
                    >
                        <option value="">All Statuses</option>
                        <option value="NEW">New</option>
                        <option value="CONTACTED">Contacted</option>
                        <option value="COMPLETED">Completed</option>
                    </select>
                </div>

                {loading ? (
                    <div className={styles.loadingContainer}>
                        <div className={styles.skeleton} style={{ width: '100%', height: '60px' }} />
                        <div className={styles.skeleton} style={{ width: '100%', height: '60px' }} />
                        <div className={styles.skeleton} style={{ width: '100%', height: '60px' }} />
                    </div>
                ) : filteredSubmissions.length === 0 ? (
                    <div className={styles.tableContainer}>
                        <div className={styles.emptyState}>
                            <div className={styles.emptyStateIcon}>📭</div>
                            <h3 className={styles.emptyStateTitle}>No submissions found</h3>
                            <p className={styles.emptyStateText}>
                                {filter || statusFilter
                                    ? 'Try adjusting your filters'
                                    : 'Contact submissions will appear here'}
                            </p>
                        </div>
                    </div>
                ) : (
                    <>
                        <div className={styles.tableContainer}>
                            <table className={styles.table}>
                                <thead className={styles.tableHead}>
                                    <tr>
                                        <th>Name</th>
                                        <th>Email</th>
                                        <th>Phone</th>
                                        <th>Message</th>
                                        <th>Status</th>
                                        <th>Date</th>
                                    </tr>
                                </thead>
                                <tbody className={styles.tableBody}>
                                    {filteredSubmissions.map((submission) => (
                                        <tr
                                            key={submission.id}
                                            onClick={() => setSelectedSubmission(submission)}
                                        >
                                            <td data-label="Name">{submission.name}</td>
                                            <td data-label="Email">
                                                <a
                                                    href={`mailto:${submission.email}`}
                                                    className={styles.emailLink}
                                                    onClick={(e) => e.stopPropagation()}
                                                >
                                                    {submission.email}
                                                </a>
                                            </td>
                                            <td data-label="Phone">{submission.phone || '-'}</td>
                                            <td data-label="Message">
                                                <div className={styles.messageCell}>
                                                    {submission.message}
                                                </div>
                                            </td>
                                            <td data-label="Status">
                                                <select
                                                    value={submission.status}
                                                    onChange={(e) => {
                                                        e.stopPropagation();
                                                        updateStatus(submission.id, e.target.value);
                                                    }}
                                                    className={`${styles.statusSelect} ${getStatusClass(submission.status)}`}
                                                    onClick={(e) => e.stopPropagation()}
                                                >
                                                    <option value="NEW">New</option>
                                                    <option value="CONTACTED">Contacted</option>
                                                    <option value="COMPLETED">Completed</option>
                                                </select>
                                            </td>
                                            <td data-label="Date" className={styles.dateCell}>
                                                {formatDate(submission.createdAt)}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>

                        <Pagination
                            currentPage={currentPage}
                            totalPages={totalPages}
                            totalItems={totalItems}
                            itemsPerPage={itemsPerPage}
                            onPageChange={setCurrentPage}
                            onItemsPerPageChange={(newItemsPerPage) => {
                                setItemsPerPage(newItemsPerPage);
                                setCurrentPage(1);
                            }}
                        />
                    </>
                )}
            </div>

            {selectedSubmission && (
                <SubmissionModal
                    submission={selectedSubmission}
                    onClose={() => setSelectedSubmission(null)}
                    onStatusUpdate={updateStatus}
                />
            )}

            <ToastContainer />
        </div>
    );
}
