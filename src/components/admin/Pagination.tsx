'use client';

import styles from './Pagination.module.css';

interface PaginationProps {
    currentPage: number;
    totalPages: number;
    totalItems: number;
    itemsPerPage: number;
    onPageChange: (page: number) => void;
    onItemsPerPageChange: (itemsPerPage: number) => void;
}

export default function Pagination({
    currentPage,
    totalPages,
    totalItems,
    itemsPerPage,
    onPageChange,
    onItemsPerPageChange,
}: PaginationProps) {
    const startItem = (currentPage - 1) * itemsPerPage + 1;
    const endItem = Math.min(currentPage * itemsPerPage, totalItems);

    const getPageNumbers = () => {
        const pages: (number | string)[] = [];
        const maxVisible = 5;

        if (totalPages <= maxVisible) {
            for (let i = 1; i <= totalPages; i++) {
                pages.push(i);
            }
        } else {
            if (currentPage <= 3) {
                for (let i = 1; i <= 4; i++) {
                    pages.push(i);
                }
                pages.push('...');
                pages.push(totalPages);
            } else if (currentPage >= totalPages - 2) {
                pages.push(1);
                pages.push('...');
                for (let i = totalPages - 3; i <= totalPages; i++) {
                    pages.push(i);
                }
            } else {
                pages.push(1);
                pages.push('...');
                pages.push(currentPage - 1);
                pages.push(currentPage);
                pages.push(currentPage + 1);
                pages.push('...');
                pages.push(totalPages);
            }
        }

        return pages;
    };

    if (totalPages <= 1) return null;

    return (
        <div className={styles.pagination}>
            <div className={styles.paginationInfo}>
                Showing {startItem} to {endItem} of {totalItems} results
            </div>

            <div className={styles.paginationControls}>
                <div className={styles.pageButtons}>
                    <button
                        className={styles.pageButton}
                        onClick={() => onPageChange(currentPage - 1)}
                        disabled={currentPage === 1}
                        aria-label="Previous page"
                    >
                        ←
                    </button>

                    {getPageNumbers().map((page, index) => (
                        typeof page === 'number' ? (
                            <button
                                key={index}
                                className={`${styles.pageButton} ${page === currentPage ? styles.active : ''}`}
                                onClick={() => onPageChange(page)}
                                aria-label={`Go to page ${page}`}
                                aria-current={page === currentPage ? 'page' : undefined}
                            >
                                {page}
                            </button>
                        ) : (
                            <span key={index} className={styles.pageButton} style={{ cursor: 'default', border: 'none' }}>
                                {page}
                            </span>
                        )
                    ))}

                    <button
                        className={styles.pageButton}
                        onClick={() => onPageChange(currentPage + 1)}
                        disabled={currentPage === totalPages}
                        aria-label="Next page"
                    >
                        →
                    </button>
                </div>

                <div className={styles.perPageSelect}>
                    <label htmlFor="itemsPerPage">Per page:</label>
                    <select
                        id="itemsPerPage"
                        value={itemsPerPage}
                        onChange={(e) => onItemsPerPageChange(Number(e.target.value))}
                    >
                        <option value={10}>10</option>
                        <option value={20}>20</option>
                        <option value={50}>50</option>
                        <option value={100}>100</option>
                    </select>
                </div>
            </div>
        </div>
    );
}
