function ViewFilters({
  selectedFilters,
  setSelectedFilters,
  handleApplyFilter,
  fetchData,
}: any) {
  return (
    <div className="flex flex-wrap items-center gap-2 w-full">
      {Object.values(selectedFilters).map((filter: any) => (
        <button
          key={filter._id}
          onClick={(e) => {
            setSelectedFilters((prev: any) => {
              const updated = { ...prev };
              delete updated[filter.type];
              return updated;
            });
          }}
          className="px-2 py-1 rounded-[2px] font-normal border border-[#E7E4DA] text-[#0E0F0C99] text-[12px] inline-flex items-center gap-2 hover:bg-[#EDEBE6] whitespace-nowrap"
        >
          {filter.name}
          <svg
            className="cursor-pointer flex-shrink-0"
            width="10"
            height="10"
            viewBox="0 0 10 10"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M4.80123 4.2162L8.1011 0.916351L9.0439 1.85916L5.74403 5.159L9.0439 8.4588L8.1011 9.4016L4.80123 6.1018L1.50141 9.4016L0.558594 8.4588L3.85843 5.159L0.558594 1.85916L1.50141 0.916351L4.80123 4.2162Z"
              fill="#0E0F0C"
              fillOpacity="0.4"
            />
          </svg>
        </button>
      ))}
      {Object.values(selectedFilters).some((f: any) => f.type !== "search") && (
        <button
          onClick={handleApplyFilter}
          className="flex items-center justify-center gap-2 bg-black-text text-white px-4 py-1 rounded-sm text-sm font-medium w-full sm:w-auto"
        >
          Apply Filters
        </button>
      )}
    </div>
  );
}

export default ViewFilters;
