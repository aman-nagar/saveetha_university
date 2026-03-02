// src/components/ui/Pagination.jsx
export default function Pagination({ currentPage, totalPages, onPageChange }) {
  if (totalPages <= 1) return null;

  const createPageNumbers = () => {
    const pages = [];

    const windowSize = 1; // pages around current
    const start = Math.max(2, currentPage - windowSize);
    const end = Math.min(totalPages - 1, currentPage + windowSize);

    pages.push(1);

    if (start > 2) {
      pages.push("...");
    }

    for (let i = start; i <= end; i++) {
      pages.push(i);
    }

    if (end < totalPages - 1) {
      pages.push("...");
    }

    if (totalPages > 1) {
      pages.push(totalPages);
    }

    return pages;
  };

  const pages = createPageNumbers();

  return (
    <div className="flex flex-wrap justify-center items-center gap-2 mt-6 pb-6">
      {/* Prev */}
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className={`px-3 py-1.5 rounded-md text-sm font-medium transition ${
          currentPage === 1
            ? "opacity-40 cursor-not-allowed border border-border"
            : "border border-border hover:bg-bg/50"
        }`}
      >
        Prev
      </button>

      {/* Page Numbers */}
      {pages.map((page, index) =>
        page === "..." ? (
          <span key={index} className="px-2 text-muted text-sm">
            ...
          </span>
        ) : (
          <button
            key={index}
            onClick={() => onPageChange(page)}
            className={`min-w-[36px] px-3 py-1.5 rounded-md text-sm font-medium transition ${
              page === currentPage
                ? "bg-primary text-white shadow-sm"
                : "border border-border hover:bg-bg/50"
            }`}
          >
            {page}
          </button>
        ),
      )}

      {/* Next */}
      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className={`px-3 py-1.5 rounded-md text-sm font-medium transition ${
          currentPage === totalPages
            ? "opacity-40 cursor-not-allowed border border-border"
            : "border border-border hover:bg-bg/50"
        }`}
      >
        Next
      </button>
    </div>
  );
}
