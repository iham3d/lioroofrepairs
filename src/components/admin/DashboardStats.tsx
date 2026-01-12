'use client';

import { useEffect, useState } from 'react';
import styles from './DashboardStats.module.css';

interface Stats {
    total: number;
    new: number;
    contacted: number;
    completed: number;
}

export default function DashboardStats() {
    const [stats, setStats] = useState<Stats | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchStats();
    }, []);

    const fetchStats = async () => {
        try {
            const response = await fetch('/api/admin/submissions/stats');
            const data = await response.json();
            setStats(data);
        } catch (error) {
            console.error('Error fetching stats:', error);
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <div className={styles.statsGrid}>
                {[1, 2, 3, 4].map((i) => (
                    <div key={i} className={`${styles.statCard} ${styles.loading}`}>
                        <div className={styles.statHeader}>
                            <div className={`${styles.skeleton} ${styles.skeletonIcon}`} />
                            <div>
                                <div className={`${styles.skeleton} ${styles.skeletonLabel}`} />
                            </div>
                        </div>
                        <div className={`${styles.skeleton} ${styles.skeletonValue}`} />
                    </div>
                ))}
            </div>
        );
    }

    if (!stats) return null;

    const statCards = [
        {
            label: 'Total Submissions',
            value: stats.total,
            icon: '📊',
            variant: 'total' as const,
        },
        {
            label: 'New',
            value: stats.new,
            icon: '🆕',
            variant: 'new' as const,
        },
        {
            label: 'Contacted',
            value: stats.contacted,
            icon: '📞',
            variant: 'contacted' as const,
        },
        {
            label: 'Completed',
            value: stats.completed,
            icon: '✅',
            variant: 'completed' as const,
        },
    ];

    return (
        <div className={styles.statsGrid}>
            {statCards.map((card) => (
                <div key={card.label} className={`${styles.statCard} ${styles[card.variant]}`}>
                    <div className={styles.statHeader}>
                        <div className={styles.statIcon}>{card.icon}</div>
                        <div>
                            <p className={styles.statLabel}>{card.label}</p>
                        </div>
                    </div>
                    <p className={styles.statValue}>{card.value}</p>
                </div>
            ))}
        </div>
    );
}
