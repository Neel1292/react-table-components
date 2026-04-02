function TableLoader({ tableHeader, rowCount = 5 }: any) {
  return (
    <>
      <div className="responsive-table">
        <table>
          <thead>
            <tr>
              {tableHeader?.map((heading: string, index: number) => (
                <th key={`${index}-${heading.slice(0, 3)}`}>{heading}</th>
              ))}
              <th></th>
            </tr>
          </thead>
          <tbody>
            {[...Array(rowCount)].map((_, rowIdx) => (
              <tr key={rowIdx} className="animate-pulse">
                {tableHeader?.map((_: any, colIdx: number) => (
                  <td key={colIdx} className="py-3">
                    <div className="h-4 bg-gray-200 rounded w-3/4 mx-auto"></div>
                  </td>
                ))}
                <td>
                  <div className="h-4 w-4 bg-gray-200 rounded mx-auto"></div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default TableLoader;
