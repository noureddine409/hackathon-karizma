import React from "react";

interface PaginationProps {
    currentPage: number;
    totalPages: number;
    previousPage: () => void;
    nextPage: () => void;
    changeCurrentPage: (pageNumber: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({
                                                   currentPage,
                                                   totalPages,
                                                   previousPage,
                                                   nextPage,
                                                   changeCurrentPage,
                                               }) => {
    const getPageNumbers = () => {
        let startPage = Math.max(currentPage - 1, 1);
        let endPage = Math.min(startPage + 2, totalPages);

        if (currentPage === totalPages) {
            startPage = Math.max(currentPage - 2, 1);
            endPage = totalPages;
        } else if (currentPage === 1) {
            endPage = Math.min(currentPage + 2, totalPages);
        }

        return Array.from({ length: endPage - startPage + 1 }, (_, index) => startPage + index);
    };

    return (
        <nav>
            <ul className="pagination">
                <li className="page-item">
                    <div className="page-link" onClick={previousPage}>
                        Previous
                    </div>
                </li>
                {getPageNumbers().map((pageNumber) => (
                    <li
                        className={`page-item ${currentPage === pageNumber ? "active" : ""}`}
                        key={pageNumber}
                    >
                        <div className="page-link" onClick={() => changeCurrentPage(pageNumber)}>
                            {pageNumber}
                        </div>
                    </li>
                ))}
                <li className="page-item">
                    <div className="page-link" onClick={nextPage}>
                        Next
                    </div>
                </li>
            </ul>
        </nav>
    );
};

export default Pagination;
