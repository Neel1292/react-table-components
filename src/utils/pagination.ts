export const getPaginationNumbers = (
  totalPages: number,
  currentPage: number
) => {
  const pages = [];

  if (currentPage > 2) {
    pages.push(1);
    if (currentPage > 3) {
      pages.push("...");
    }
  }
  for (
    let i = Math.max(1, currentPage - 1);
    i <= Math.min(totalPages, currentPage + 1);
    i++
  ) {
    pages.push(i);
  }
  if (currentPage < totalPages - 1) {
    if (currentPage < totalPages - 2) {
      pages.push("...");
    }
    pages.push(totalPages);
  }
  return pages;
};
