import React from 'react';
import { TableHeaderFilterConfig } from './types';

interface TableHeaderProps {
  totalCount?: number;
  filters?: TableHeaderFilterConfig[];
  actions?: React.ReactNode;
}

const TableHeader: React.FC<TableHeaderProps> = ({ totalCount = 0, filters = [], actions }) => {
  return (
    <div className="space-y-6">
      {/* Total Count and Filters - Professional Layout */}
      <div className="mb-5 flex flex-col xl:flex-row items-start xl:items-center justify-between gap-4">
        {/* Total Count */}
        {/* <span className="font-semibold text-black-text xl:w-auto w-full text-left">
          Total : {totalCount || 0}
        </span> */}

        {/* Filters Section - Professional Design */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-start gap-2 sm:gap-4 xl:gap-7 w-full sm:w-auto">
          {filters.length > 0 && <span className="text-sm font-medium text-black-text/60">Filter by:</span>}

          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 xl:gap-4 w-full sm:w-auto">
            {filters.length > 0 && filters.map((filter) => {
                if (filter.type === 'select') {
                  return (
                    <div key={filter.key} className="relative inline-block w-full sm:w-auto">
                      <select
                        value={String(filter.value || '')}
                        onChange={(e) => filter.onChange(e.target.value)}
                        className="w-full sm:w-auto appearance-none capitalize border border-light-border rounded-sm px-3 py-2 pr-8 text-black-text/80 text-[13px] bg-white hover:border-gray-400 focus:outline-none focus:ring-1 focus:ring-yellow-400 transition-colors cursor-pointer"
                      >
                        <option value="">{filter.label}</option>
                        {filter.options?.map((opt) => (
                          <option key={opt.value} value={opt.value}>
                            {opt.label}
                          </option>
                        ))}
                      </select>
                      <svg
                        className="w-4 h-4 text-gray-500 absolute right-2 top-1/2 transform -translate-y-1/2 pointer-events-none"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M19 9l-7 7-7-7"
                        />
                      </svg>
                    </div>
                  );
                }

                if (filter.type === 'date') {
                  return (
                    <input
                      key={filter.key}
                      type="date"
                      value={
                        filter.value instanceof Date
                          ? filter.value.toISOString().split('T')[0]
                          : String(filter.value || '')
                      }
                      onChange={(e) => filter.onChange(e.target.value)}
                      className="w-full sm:w-auto border border-light-border rounded-sm px-3 py-2 text-black-text/80 text-[13px] bg-white hover:border-gray-400 focus:outline-none focus:ring-1 focus:ring-yellow-400 transition-colors cursor-pointer"
                      placeholder="mm/dd/yyyy"
                    />
                  );
                }

                if (filter.type === 'input') {
                  const searchIcon = filter.icon || (
                    <svg 
                      width="16" 
                      height="16" 
                      viewBox="0 0 16 16" 
                      fill="none" 
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path 
                        d="M7.33333 12.6667C10.2789 12.6667 12.6667 10.2789 12.6667 7.33333C12.6667 4.38781 10.2789 2 7.33333 2C4.38781 2 2 4.38781 2 7.33333C2 10.2789 4.38781 12.6667 7.33333 12.6667Z" 
                        stroke="currentColor" 
                        strokeWidth="1.5" 
                        strokeLinecap="round" 
                        strokeLinejoin="round"
                      />
                      <path 
                        d="M14 14L11.1 11.1" 
                        stroke="currentColor" 
                        strokeWidth="1.5" 
                        strokeLinecap="round" 
                        strokeLinejoin="round"
                      />
                    </svg>
                  );
                  
                  return (
                    <div key={filter.key} className="relative flex items-center xl:w-auto lg:w-auto sm:w-auto w-full">
                      <span className="absolute left-1 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none flex items-center">
                        {searchIcon}
                      </span>
                      <input
                        type="text"
                        placeholder={filter.placeholder || filter.label}
                        value={String(filter.value || '')}
                        onChange={(e) => filter.onChange(e.target.value)}
                        className="w-full text-xs border border-light-border rounded-sm pl-9 pr-3 py-2 h-9 max-[320px]:!pl-9 text-black-text/80 bg-white placeholder-gray-400 hover:border-gray-400 focus:outline-none focus:ring-1 focus:ring-yellow-400 transition-colors"
                      />
                    </div>
                  );
                }
                return null;
              })}
            {actions}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TableHeader;
