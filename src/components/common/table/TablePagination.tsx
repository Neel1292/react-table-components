interface Props {
  page?: number
  setPage?: (page: number) => void
  totalPages?: number
  total?: number
  dataLength?: number
}

const getPaginationNumbers = (totalPages: number, currentPage: number) => {
  const delta = 2;
  const range = [];
  for (let i = Math.max(2, currentPage - delta); i <= Math.min(totalPages - 1, currentPage + delta); i++) {
    range.push(i);
  }
  if (currentPage - delta > 2) range.unshift("...");
  if (currentPage + delta < totalPages - 1) range.push("...");
  range.unshift(1);
  if (totalPages > 1) range.push(totalPages);
  return range;
};

const TablePagination = ({
  page = 1,
  setPage,
  totalPages = 1,
  total,
  dataLength = 0
}: Props) => {
  return (
    <div className="flex flex-wrap items-center justify-between gap-3 mt-4 lg:mt-2">
      <span className="text-black-text/60 text-xs text-center sm:text-left">
        Showing {dataLength} results out of {total}
      </span>

      <div className="flex items-center gap-1 sm:gap-5">
        {/* Prev Button */}
        <div
          className={`md:px-5 py-0 sm:py-2 p-3 px-1 cursor-pointer ${
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
        <div className="flex items-center gap-2">
          {getPaginationNumbers(totalPages, page).map((p, index) =>
            p === "..." ? (
              <div
                key={`dots-${index}`}
                className="px-2 sm:px-4 py-0 sm:py-2 p-2 text-black-text/60 cursor-default select-none"
              >
                ...
              </div>
            ) : (
              <div
                key={p}
                className={`px-2 sm:px-4 py-0 sm:py-2 p-2 cursor-pointer ${
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
          className={`md:px-5 py-0 sm:py-2 p-3 px-1 rotate-180 cursor-pointer ${
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