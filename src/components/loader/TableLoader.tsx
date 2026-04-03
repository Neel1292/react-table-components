function TableLoader({ columns = 5, rowCount = 5 }: { columns?: number, rowCount?: number }) {
  return (
    <>
      {[...Array(rowCount)].map((_, rowIdx) => (
        <tr key={rowIdx} className="bg-white">
          {[...Array(columns)].map((_, colIdx) => (
            <td 
              key={colIdx} 
              className="px-3 sm:px-5 py-[16px] first:rounded-l-[2px] first:border-l first:border-[#CDCDCD] last:rounded-r-[2px]"
            >
              <div className={`h-4 bg-gray-200 rounded-md animate-pulse ${colIdx === columns - 1 ? 'w-8 ml-auto' : 'w-3/4'}`}></div>
            </td>
          ))}
        </tr>
      ))}
    </>
  );
}

export default TableLoader;
