'use client';

import { useEffect, useState } from 'react';
import { signOut } from 'next-auth/react';
import { formatDate } from '@/lib/utils';
import type { ContactSubmission } from '@/types';

export default function AdminDashboard() {
    const [submissions, setSubmissions] = useState<ContactSubmission[]>([]);
    const [loading, setLoading] = useState(true);
    const [filter, setFilter] = useState('');
    const [statusFilter, setStatusFilter] = useState('');

    useEffect(() => {
        fetchSubmissions();
    }, [statusFilter]);

    const fetchSubmissions = async () => {
        try {
            const params = new URLSearchParams();
            if (statusFilter) params.append('status', statusFilter);

            const response = await fetch(`/api/admin/submissions?${params}`);
            const data = await response.json();
            setSubmissions(data.submissions || []);
        } catch (error) {
            console.error('Error fetching submissions:', error);
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
            }
        } catch (error) {
            console.error('Error updating status:', error);
        }
    };

    const filteredSubmissions = submissions.filter((sub) =>
        sub.name.toLowerCase().includes(filter.toLowerCase()) ||
        sub.email.toLowerCase().includes(filter.toLowerCase()) ||
        sub.message.toLowerCase().includes(filter.toLowerCase())
    );

    return (
        <div style={{ minHeight: '80vh', background: 'var(--color-neutral-100)', padding: 'var(--space-3xl) 0' }}>
            <div className="container">
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'var(--space-2xl)' }}>
                    <h1>Contact Submissions</h1>
                    <button onClick={() => signOut()} className="btn btn-outline">
                        Sign Out
                    </button>
                </div>

                <div style={{ marginBottom: 'var(--space-xl)', display: 'flex', gap: 'var(--space-md)', flexWrap: 'wrap' }}>
                    <input
                        type="text"
                        placeholder="Search submissions..."
                        value={filter}
                        onChange={(e) => setFilter(e.target.value)}
                        className="form-input"
                        style={{ maxWidth: '300px' }}
                    />

                    <select
                        value={statusFilter}
                        onChange={(e) => setStatusFilter(e.target.value)}
                        className="form-select"
                        style={{ maxWidth: '200px' }}
                    >
                        <option value="">All Statuses</option>
                        <option value="NEW">New</option>
                        <option value="CONTACTED">Contacted</option>
                        <option value="COMPLETED">Completed</option>
                    </select>
                </div>

                {loading ? (
                    <p>Loading...</p>
                ) : (
                    <div style={{ background: 'var(--color-white)', borderRadius: 'var(--radius-lg)', overflow: 'hidden', boxShadow: 'var(--shadow-md)' }}>
                        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                            <thead style={{ background: 'var(--color-neutral-200)' }}>
                                <tr>
                                    <th style={{ padding: 'var(--space-md)', textAlign: 'left' }}>Name</th>
                                    <th style={{ padding: 'var(--space-md)', textAlign: 'left' }}>Email</th>
                                    <th style={{ padding: 'var(--space-md)', textAlign: 'left' }}>Phone</th>
                                    <th style={{ padding: 'var(--space-md)', textAlign: 'left' }}>Message</th>
                                    <th style={{ padding: 'var(--space-md)', textAlign: 'left' }}>Status</th>
                                    <th style={{ padding: 'var(--space-md)', textAlign: 'left' }}>Date</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredSubmissions.map((submission) => (
                                    <tr key={submission.id} style={{ borderBottom: '1px solid var(--color-neutral-200)' }}>
                                        <td style={{ padding: 'var(--space-md)' }}>{submission.name}</td>
                                        <td style={{ padding: 'var(--space-md)' }}>
                                            <a href={`mailto:${submission.email}`} style={{ color: 'var(--color-primary)' }}>
                                                {submission.email}
                                            </a>
                                        </td>
                                        <td style={{ padding: 'var(--space-md)' }}>{submission.phone || '-'}</td>
                                        <td style={{ padding: 'var(--space-md)', maxWidth: '300px' }}>
                                            <div style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                                                {submission.message}
                                            </div>
                                        </td>
                                        <td style={{ padding: 'var(--space-md)' }}>
                                            <select
                                                value={submission.status}
                                                onChange={(e) => updateStatus(submission.id, e.target.value)}
                                                style={{
                                                    padding: 'var(--space-sm) var(--space-md)',
                                                    borderRadius: 'var(--radius-sm)',
                                                    border: '1px solid var(--color-neutral-300)',
                                                    fontSize: 'var(--font-size-sm)',
                                                    background: submission.status === 'NEW' ? 'hsl(210, 90%, 95%)' :
                                                        submission.status === 'CONTACTED' ? 'hsl(38, 92%, 95%)' :
                                                            'hsl(142, 71%, 95%)',
                                                }}
                                            >
                                                <option value="NEW">New</option>
                                                <option value="CONTACTED">Contacted</option>
                                                <option value="COMPLETED">Completed</option>
                                            </select>
                                        </td>
                                        <td style={{ padding: 'var(--space-md)', fontSize: 'var(--font-size-sm)', color: 'var(--color-neutral-600)' }}>
                                            {formatDate(submission.createdAt)}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>

                        {filteredSubmissions.length === 0 && (
                            <div style={{ padding: 'var(--space-3xl)', textAlign: 'center', color: 'var(--color-neutral-600)' }}>
                                No submissions found
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
}
