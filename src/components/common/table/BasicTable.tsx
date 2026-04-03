import { useState, useEffect } from "react";
import { BasicTableProps, Column } from "./types";
import TablePagination from "./TablePagination";
import TableLoader from "../../loader/TableLoader";
import TableActions from "./TableActions";
import TableHeader from "./TableHeader";

function BasicTable<T>({
  columns,
  data,
  actionColumn,
  isLoading,
  skeletonRowCount,
  skeletonColumnCount,
  page,
  pageSize,
  setPage,
  onPageChange,
  total,
  totalPages,
  noDataMessage = "No data found",
  sortBy: initialSortBy = "",
  sortOrder: initialSortOrder = "asc",
  onSort,
  tableHeader,
}: BasicTableProps<T>) {
  const [sortBy, setSortBy] = useState(initialSortBy);
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>(initialSortOrder);
  const [currentPage, setCurrentPage] = useState(page || 1);

  useEffect(() => {
    if (page !== undefined) {
      setCurrentPage(page);
    }
  }, [page]);

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
    if (setPage) setPage(newPage);
    if (onPageChange) onPageChange(newPage);
  };

  const isClientSide = !onPageChange && !setPage && data.length > 0 && !!pageSize;
  const actualTotalPages = isClientSide ? Math.ceil(data.length / pageSize) : totalPages;
  const actualTotal = isClientSide ? data.length : total;

  const displayData = isClientSide
    ? data.slice((currentPage - 1) * pageSize, currentPage * pageSize)
    : data;

  const handleSort = (column: Column<T>) => {
    if (!column.sortable) return;

    const key = column.sortKey || (column.accessor as string);
    let newOrder: 'asc' | 'desc' = 'asc';

    if (sortBy === key && sortOrder === 'asc') {
      newOrder = 'desc';
    }

    setSortBy(key);
    setSortOrder(newOrder);
    onSort?.(key, newOrder);
  };

  const getAlignmentClass = (alignment?: string) => {
    switch (alignment) {
      case 'center':
        return 'text-center';
      case 'right':
        return 'text-right';
      default:
        return 'text-left';
    }
  };

  const renderSortIndicator = (column: Column<T>) => {
    if (!column.sortable) return null;

    const key = column.sortKey || (column.accessor as string);
    if (sortBy !== key) return <span className="text-gray-300 ml-1">↕</span>;

    return (
      <span className="ml-1 text-black-text">
        {sortOrder === 'asc' ? '↑' : '↓'}
      </span>
    );
  };

  const renderHeaderContent = (column: Column<T>) => {
    if (!column.sortable) {
      return (
        <div className="flex items-center">
          {column.icon && <span className="mr-2">{column.icon}</span>}
          <span>{column.header}</span>
        </div>
      );
    }

    return (
      <div className="flex items-center">
        {column.icon && <span className="mr-2">{column.icon}</span>}
        <span 
          className="inline-flex items-center cursor-pointer hover:opacity-70"
          onClick={(e) => {
            e.stopPropagation();
            handleSort(column);
          }}
        >
          {column.header}
          {renderSortIndicator(column)}
        </span>
      </div>
    );
  };

  const getColumnWidth = (column: Column<T>) => {
    if (!column.width) return {};
    return {
      width: typeof column.width === 'number' ? `${column.width}px` : column.width,
    };
  };

  const actionColsCount = actionColumn?.show ? 1 : 0;
  const totalColsCount = columns.length + actionColsCount;

  return (
    <div className="w-full pt-5 px-4 xl:px-0">
      {/* Render table header with Total and Filters if provided */}
      {tableHeader && (
        <TableHeader
          totalCount={tableHeader.totalCount}
          filters={tableHeader.filters}
          actions={tableHeader.actions}
        />
      )}

      {/* Table Container */}
      <div className="bg-[#F7F6F4] rounded-2xl sm:px-[28px] px-[10px] py-[16px] w-full mt-6">
        <div className="overflow-x-auto -mx-[10px] sm:mx-0 px-[10px] sm:px-0">
          <table className="border-separate border-spacing-y-[5px] w-full text-sm table-auto min-w-[640px]">
            <thead>
              <tr>
              {columns.map((col, i) => (
                <th
                  key={i}
                  className={`text-xs font-normal text-start text-[#525151] px-3 sm:px-5 pb-3 pt-3 whitespace-nowrap ${getAlignmentClass(col.alignment)}`}
                  style={getColumnWidth(col)}
                >
                  {renderHeaderContent(col)}
                </th>
              ))}

            {actionColumn?.show && (
              <th className={`text-xs font-normal text-start text-[#525151] px-3 sm:px-5 pb-3 pt-3 ${getAlignmentClass(actionColumn.alignment)}`}>
              </th>
            )}
          </tr>
        </thead>

        <tbody>
          {isLoading ? (
            <TableLoader 
               columns={skeletonColumnCount || totalColsCount} 
               rowCount={skeletonRowCount || 5} 
            />
          ) : displayData.length === 0 ? (
            <tr>
              <td
                colSpan={totalColsCount}
                className="text-center py-6 text-gray-400"
              >
                {noDataMessage}
              </td>
            </tr>
          ) : (
            displayData.map((row, rowIndex) => (
              <tr
                key={rowIndex}
                className="bg-white"
              >
                {columns.map((col, colIndex) => (
                  <td
                    key={colIndex}
                    className={`text-xs sm:text-sm font-normal text-start text-[#737373] px-3 sm:px-5 py-[9px] first:rounded-l-[2px] first:border-l first:border-[#CDCDCD] last:rounded-r-[2px] ${getAlignmentClass(col.alignment)} ${col.className || ''}`}
                    style={getColumnWidth(col)}
                  >
                    <div className="flex items-center">
                      {col.icon && col.showIcon?.(row) !== false && (
                        <span className="mr-2">{col.icon}</span>
                      )}
                      {col.render ? col.render(row) : (row as any)[col.accessor]}
                    </div>
                  </td>
                ))}

                {actionColumn?.show && (
                  <td className={`text-xs sm:text-sm font-normal text-start text-[#737373] px-3 sm:px-5 py-[9px] last:rounded-r-[2px] cursor-pointer ${getAlignmentClass(actionColumn.alignment)}`}>
                    {actionColumn.customRender ? (
                      actionColumn.customRender(row, actionColumn.actions || [])
                    ) : (
                      <TableActions>
                        {actionColumn.actions?.map((action) => (
                          <li
                            key={action.type}
                            onClick={() => action.onClick(row)}
                            className={`px-4 py-2 text-xs sm:text-sm hover:bg-gray-100 cursor-pointer ${action.className || ''}`}
                          >
                            <span className="inline-flex items-center gap-2">
                              {action.icon}
                              {action.label || action.type.charAt(0).toUpperCase() + action.type.slice(1)}
                            </span>
                          </li>
                        ))}
                      </TableActions>
                    )}
                  </td>
                )}
              </tr>
            ))
          )}
        </tbody>
      </table>
      </div>

      {actualTotalPages && actualTotalPages > 1 && (
        <TablePagination
          page={currentPage}
          setPage={handlePageChange}
          totalPages={actualTotalPages}
          total={actualTotal as number}
          dataLength={displayData?.length}
        />
      )}
      </div>
    </div>
  );
}

export default BasicTable;