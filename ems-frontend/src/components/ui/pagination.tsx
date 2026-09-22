import { ChevronLeft, ChevronRight } from "lucide-react";
import React, { FC, useMemo } from "react";

type PaginationProps = {
  page: number;
  total: number;
  onPageChange: (page: number) => void;
  handleChangePage: (direction: "next" | "prev", page: any) => void;
};

export const Pagination: FC<PaginationProps> = (props) => {
  const {
    page: currentPage,
    total: totalPages,
    onPageChange,
    handleChangePage,
  } = props;

  const generatePages = useMemo(() => {
    const pages: (number | string | any)[] = [];

    if (totalPages <= 7) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      if (currentPage <= 4) {
        for (let i = 1; i <= 5; i++) pages.push(i);
        pages.push("...");
        pages.push(totalPages);
      } else if (currentPage === 5) {
        pages.push(1);
        pages.push("...");
        for (let i = 4; i <= 6; i++) pages.push(i);
        pages.push("...");
        pages.push(totalPages);
      } else if (currentPage > 5 && currentPage < totalPages - 3) {
        pages.push(1);
        pages.push("...");
        pages.push(currentPage - 1);
        pages.push(currentPage);
        pages.push(currentPage + 1);
        pages.push("...");
        pages.push(totalPages);
      } else {
        pages.push(1);
        pages.push("...");
        for (let i = totalPages - 4; i <= totalPages; i++) pages.push(i);
      }
    }

    return pages;
  }, [currentPage, totalPages]);

  return (
    <nav aria-label="Pagination" className="flex justify-center">
      <div className="flex items-center gap-2">
        
        {/* LEFT ICON BUTTON */}
        <button
          onClick={() => {
            if (currentPage > 1) {
              const page = currentPage - 1;
              onPageChange(page);
              handleChangePage("prev", page);
            }
          }}
          disabled={currentPage === 1}
          className={`flex items-center justify-center w-8 h-8 rounded-xl transition
            ${currentPage === 1 
              ? "bg-gray-100 text-gray-300 cursor-not-allowed"
              : "bg-gray-100 text-gray-700 hover:bg-gray-200"}
          `}
        >
          <ChevronLeft size={16} />
        </button>

        {/* PAGE NUMBERS */}
        {generatePages.map((page: any, index) =>
          page === "..." ? (
            <span
              key={index}
              className="px-2 text-sm font-medium text-gray-400 select-none"
            >
              ...
            </span>
          ) : (
            <button
              key={index}
              onClick={() => {
                onPageChange(page);
                handleChangePage(page > currentPage ? "next" : "prev", page);
              }}
              aria-current={page === currentPage ? "page" : undefined}
              className={`w-8 h-8 flex items-center justify-center rounded-xl text-sm transition
                ${
                  page === currentPage
                    ? "bg-[#0D3B45] text-white"
                    : "bg-gray-100 text-gray-800 hover:bg-gray-200"
                }
              `}
            >
              {page}
            </button>
          )
        )}

        {/* RIGHT ICON BUTTON */}
        <button
          onClick={() => {
            if (currentPage < totalPages) {
              const page = currentPage + 1;
              onPageChange(page);
              handleChangePage("next", page);
            }
          }}
          disabled={currentPage === totalPages}
          className={`flex items-center justify-center w-8 h-8 rounded-xl transition
            ${
              currentPage === totalPages
                ? "bg-gray-100 text-gray-300 cursor-not-allowed"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }
          `}
        >
          <ChevronRight size={16} />
        </button>
      </div>
    </nav>
  );
};
