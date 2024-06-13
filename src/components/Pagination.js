import React from 'react';

const Pagination = ({ page, onPageChange, hasNextPage }) => {
  const handlePrevious = () => {
    if (page > 1) {
      onPageChange(page - 1);
    }
  };

  const handleNext = () => {
    onPageChange(page + 1);
  };

  return (
    <div>
      <button onClick={handlePrevious} disabled={page === 1}>
        Previous
      </button>
      <span>Page {page}</span>
      <button onClick={handleNext} disabled={!hasNextPage}>
        Next
      </button>
    </div>
  );
};

export default Pagination;
