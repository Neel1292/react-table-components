interface Props {
  page?: number
  setPage?: (page: number) => void
  totalPages?: number
  total?: number
  dataLength?: number
}

const getPaginationNumbers = (totalPages: number, currentPage: number) => {
  const totalNumbers = 7;
  
  if (totalPages <= totalNumbers) {
    return Array.from({ length: totalPages }, (_, i) => i + 1);
  }

  const isStart = currentPage <= 4;
  const isEnd = currentPage >= totalPages - 3;

  if (isStart) {
    return [1, 2, 3, 4, 5, "...", totalPages];
  }

  if (isEnd) {
    return [1, "...", totalPages - 4, totalPages - 3, totalPages - 2, totalPages - 1, totalPages];
  }

  return [1, "...", currentPage - 1, currentPage, currentPage + 1, "...", totalPages];
};

const TablePagination = ({
  page = 1,
  setPage,
  totalPages = 1,
  total,
  dataLength = 0
}: Props) => {
  return (
    <div className="flex flex-col sm:flex-row items-center justify-between gap-3 mt-4 lg:mt-2">
      <span className="text-black-text/60 text-xs text-center sm:text-left w-full sm:w-auto">
        Showing {dataLength} results out of {total}
      </span>

      <div className="flex items-center gap-1 sm:gap-5 w-full sm:w-auto justify-center">
        {/* Prev Button */}
        <div
          className={`px-2 sm:px-3 md:px-5 py-2 cursor-pointer ${
            page === 1 ? "opacity-50 pointer-events-none" : ""
          }`}
          onClick={() => setPage?.(Math.max(page - 1, 1))}
        >
          <svg width="10" height="17" viewBox="0 0 10 17" fill="none">
            <path
              d="M9 1L2 8.5L9 16"
              stroke="#0E0F0C"
              strokeOpacity="0.6"
              strokeWidth="1.5"
            />
          </svg>
        </div>

        {/* Numbers */}
        <div className="flex items-center gap-1 sm:gap-2">
          {getPaginationNumbers(totalPages, page).map((p, index) =>
            p === "..." ? (
              <div
                key={`dots-${index}`}
                className="px-2 sm:px-3 py-2 text-black-text/60 cursor-default select-none text-sm"
              >
                ...
              </div>
            ) : (
              <div
                key={p}
                className={`px-2 sm:px-3 py-2 cursor-pointer text-sm ${
                  page === p
                    ? "text-black-text font-medium"
                    : "text-black-text/60"
                }`}
                onClick={() => setPage?.(p as number)}
              >
                {p}
              </div>
            )
          )}
        </div>

        {/* Next Button */}
        <div
          className={`px-2 sm:px-3 md:px-5 py-2 rotate-180 cursor-pointer ${
            page === totalPages ? "opacity-50 pointer-events-none" : ""
          }`}
          onClick={() => setPage?.(Math.min(page + 1, totalPages))}
        >
          <svg width="10" height="17" viewBox="0 0 10 17" fill="none">
            <path
              d="M9 1L2 8.5L9 16"
              stroke="#0E0F0C"
              strokeOpacity="0.6"
              strokeWidth="1.5"
            />
          </svg>
        </div>
      </div>
    </div>
  )
}

export default TablePagination