import { ChevronLeft, ChevronRight } from "lucide-react";

export default function Pagination({ page, totalPages, onPageChange }) {
  return (
    <div className="flex justify-end items-center gap-2 mt-4">
      <button
        disabled={page === 1}
        onClick={() => onPageChange(page - 1)}
        className="border px-2 py-1 rounded disabled:opacity-40"
      >
        <ChevronLeft size={16} />
      </button>

      <span className="bg-red-700 text-white px-3 py-1 rounded text-sm">
        {page}
      </span>

      <button
        disabled={page === totalPages}
        onClick={() => onPageChange(page + 1)}
        className="border px-2 py-1 rounded disabled:opacity-40"
      >
        <ChevronRight size={16} />
      </button>
    </div>
  );
}
