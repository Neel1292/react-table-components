import React, { useState, useRef, useEffect } from "react";

const TableActions: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [open, setOpen] = useState(false);
  const [position, setPosition] = useState({ top: 0, right: 0 });
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleToggle = () => {
    if (!open && ref.current) {
      const rect = ref.current.getBoundingClientRect();
      setPosition({
        top: rect.bottom + 8,
        right: window.innerWidth - rect.right,
      });
    }
    setOpen(!open);
  };

  return (
    <div className="relative inline-block" ref={ref}>
      <button
        onClick={handleToggle}
        className="inline-flex items-center justify-center text-gray-500 hover:text-gray-700 transition-colors"
        title="Actions"
      >
        <svg width="4" height="13" viewBox="0 0 4 13" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M2 2.29199C1.85082 2.29199 1.70774 2.23273 1.60225 2.12724C1.49676 2.02175 1.4375 1.87868 1.4375 1.72949C1.4375 1.58031 1.49676 1.43723 1.60225 1.33174C1.70774 1.22626 1.85082 1.16699 2 1.16699C2.14918 1.16699 2.29226 1.22626 2.39775 1.33174C2.50324 1.43723 2.5625 1.58031 2.5625 1.72949C2.5625 1.87868 2.50324 2.02175 2.39775 2.12724C2.29226 2.23273 2.14918 2.29199 2 2.29199ZM2 6.79199C1.85082 6.79199 1.70774 6.73273 1.60225 6.62724C1.49676 6.52175 1.4375 6.37868 1.4375 6.22949C1.4375 6.08031 1.49676 5.93723 1.60225 5.83174C1.70774 5.72626 1.85082 5.66699 2 5.66699C2.14918 5.66699 2.29226 5.72626 2.39775 5.83174C2.50324 5.93723 2.5625 6.08031 2.5625 6.22949C2.5625 6.37868 2.50324 6.52175 2.39775 6.62724C2.29226 6.73273 2.14918 6.79199 2 6.79199ZM2 11.292C1.85082 11.292 1.70774 11.2327 1.60225 11.1272C1.49676 11.0218 1.4375 10.8787 1.4375 10.7295C1.4375 10.5803 1.49676 10.4372 1.60225 10.3317C1.70774 10.2263 1.85082 10.167 2 10.167C2.14918 10.167 2.29226 10.2263 2.39775 10.3317C2.50324 10.4372 2.5625 10.5803 2.5625 10.7295C2.5625 10.8787 2.50324 11.0218 2.39775 11.1272C2.29226 11.2327 2.14918 11.292 2 11.292Z"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>

      {open && (
        <div 
          className="fixed w-28 p-1 bg-white shadow-lg rounded-[8px] overflow-hidden z-50"
          style={{ top: `${position.top}px`, right: `${position.right}px` }}
        >
          <ul className="max-h-60 overflow-y-auto">
            {children}
          </ul>
        </div>
      )}
    </div>
  );
};

export default TableActions;