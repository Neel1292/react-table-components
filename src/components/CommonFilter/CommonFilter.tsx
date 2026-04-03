import { useState, useRef, useEffect } from "react";
import { DateRange } from "react-date-range";
import { FilterConfig, FilterType } from "../../utils/filterTypeEnum";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";

interface Props {
  filters: FilterConfig[];
  onClear?: () => void;
}

const monthNamesShort = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

const CommonFilter: React.FC<Props> = ({ filters, onClear }) => {
  const [openRange, setOpenRange] = useState<{ [key: string]: boolean }>({});
  const refs = useRef<Record<string, HTMLDivElement | null>>({});
  const hiddenDateRefs = useRef<Record<string, HTMLInputElement | null>>({});
  const [pickerYear, setPickerYear] = useState<Record<string, number>>({});

  useEffect(() => {
    const onDocDown = (e: MouseEvent) => {
      const target = e.target as Node | null;
      if (!target) return;
      setOpenRange((prev) => {
        const next = { ...prev };
        let changed = false;
        Object.keys(prev).forEach((k) => {
          if (!prev[k]) return;
          const container = refs.current[k];
          if (!container) {
            next[k] = false;
            changed = true;
            return;
          }
          if (!container.contains(target)) {
            next[k] = false;
            changed = true;
          }
        });
        return changed ? next : prev;
      });
    };
    const onEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpenRange({});
    };
    document.addEventListener("mousedown", onDocDown);
    document.addEventListener("keydown", onEsc);
    return () => {
      document.removeEventListener("mousedown", onDocDown);
      document.removeEventListener("keydown", onEsc);
    };
  }, []);

  const anyFilterActive = filters.some((f) => {
    if (f.type === (FilterType as any).DATE_RANGE)
      return !!(f.value?.startDate || f.value?.endDate);
    if ((f.type as any) === (FilterType as any).MONTH)
      return !!(f.value && String(f.value).trim() !== "");
    return (
      f.value !== undefined && f.value !== null && String(f.value).trim() !== ""
    );
  });

  useEffect(() => {
    const next: Record<string, number> = {};
    filters.forEach((f) => {
      if ((f.type as any) === FilterType.MONTH) {
        if (typeof f.value === "string" && f.value.includes("-")) {
          const [y] = String(f.value).split("-");
          const parsed = Number(y);
          next[f.key] = !isNaN(parsed) ? parsed : new Date().getFullYear();
        } else {
          next[f.key] = new Date().getFullYear();
        }
      }
    });
    setPickerYear((prev) => ({ ...prev, ...next }));
  }, [filters.map((f) => f.value).join("|")]);

  const monthLabel = (val?: string | Date) => {
    if (!val) return "";
    try {
      if (typeof val === "string") {
        const parts = val.split("-");
        if (parts.length >= 2) {
          const y = Number(parts[0]);
          const m = Number(parts[1]);
          if (!isNaN(y) && !isNaN(m)) {
            const d = new Date(y, m - 1, 1);
            return d.toLocaleString(undefined, {
              month: "short",
              year: "numeric",
            });
          }
        }
        const dd = new Date(val);
        if (!isNaN(dd.getTime()))
          return dd.toLocaleString(undefined, {
            month: "short",
            year: "numeric",
          });
      } else if (val instanceof Date) {
        return val.toLocaleString(undefined, {
          month: "short",
          year: "numeric",
        });
      }
    } catch { }
    return String(val);
  };


  const formatDateDDMMYYYY = (iso?: string | Date | null) => {
    if (!iso) return "";
    try {
      const d = typeof iso === "string" ? new Date(iso) : new Date(iso as Date);
      if (isNaN(d.getTime())) return "";
      return d.toLocaleDateString("en-US", {
        month: "2-digit",
        day: "2-digit",
        year: "numeric",
      });
    } catch {
      return "";
    }
  };

  return (
    <div className="flex flex-row flex-wrap items-center gap-3 w-full">
      {filters.map((filter: any) => {
        switch (filter.type) {
          case FilterType.SELECT:
            return (
              <div key={filter.key} className="relative flex-1 sm:flex-initial sm:w-auto sm:min-w-[160px]">
                <select
                  className="appearance-none w-full capitalize border border-light-border rounded-sm px-3 py-2 pr-7 text-black-text/80 text-[13px] bg-white focus:outline-none focus:ring-1 focus:ring-gray-300"
                  value={filter.value || ""}
                  onChange={(e: any) => filter.changeFunc(e)}
                >
                  <option value="" hidden={filter.hideDefaultOption}>
                    {filter.defaultValue}
                  </option>
                  {filter.options?.map((opt: any, i: number) => (
                    <option
                      key={`${opt._id ?? opt.id ?? opt.value}-${i}`}
                      value={opt._id ?? opt.id ?? opt.value}
                      className="text-black-text/80"
                    >
                      {opt.name ?? opt.title ?? opt.value}
                    </option>
                  ))}
                </select>
                <svg
                  className="w-4 h-4 text-gray-400 absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none"
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
          case FilterType.INPUT:
            return (
              <div
                key={filter.key}
                className="relative flex items-center flex-1 sm:flex-initial sm:min-w-[200px] sm:max-w-[300px]"
              >
                <span className="absolute left-2 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none flex items-center">
                  {filter.icon}
                </span>
                <input
                  type="text"
                  placeholder={filter.placeholder}
                  value={filter.value ?? ""}
                  onChange={(e: any) => filter.changeFunc(e)}
                  className="w-full text-xs sm:text-sm border border-light-border rounded-sm pl-8 pr-4 py-2 h-[37px] text-black-text/80 placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-300"
                />
              </div>
            );
          case FilterType.DATE:
            return (
              <div key={filter.key} className="relative flex-1 sm:flex-initial sm:w-auto sm:min-w-[160px]">
                <div className="relative">
                  <svg
                    className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2 pointer-events-none"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#666"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <rect
                      x="3"
                      y="4"
                      width="18"
                      height="18"
                      rx="2"
                      ry="2"
                    ></rect>
                    <line x1="16" y1="2" x2="16" y2="6"></line>
                    <line x1="8" y1="2" x2="8" y2="6"></line>
                    <line x1="3" y1="10" x2="21" y2="10"></line>
                  </svg>
                  <input
                    type="text"
                    readOnly
                    placeholder="mm/dd/yyyy"
                    value={formatDateDDMMYYYY(filter.value)}
                    onClick={() => {
                      const hid = hiddenDateRefs.current[filter.key];
                      if (!hid) return;
                      hid.showPicker?.();
                      hid.focus();
                      hid.click();
                    }}
                    className="w-full border border-light-border rounded-sm pl-10 pr-3 py-2 text-[#737373] text-[13px] bg-white focus:outline-none focus:ring-1 focus:ring-gray-300 cursor-pointer"
                  />
                  <input
                    ref={(el: HTMLInputElement | null) => {
                      hiddenDateRefs.current[filter.key] = el;
                    }}
                    type="date"
                    className="sr-only"
                    value={
                      filter.value
                        ? new Date(filter.value).toISOString().split("T")[0]
                        : ""
                    }
                    onChange={(e: any) => {
                      const val = e.target.value ?? "";
                      filter.changeFunc &&
                        filter.changeFunc({ target: { value: val } });
                    }}
                  />
                </div>
              </div>
            );
          case (FilterType as any).MONTH: {
            const currentYear =
              pickerYear[filter.key] ?? new Date().getFullYear();
            const selectedYear =
              typeof filter.value === "string" && filter.value.includes("-")
                ? Number(filter.value.split("-")[0])
                : null;
            const selectedMonthIndex =
              typeof filter.value === "string" && filter.value.includes("-")
                ? Number(filter.value.split("-")[1]) - 1
                : null;
            return (
              <div
                key={filter.key}
                className="relative flex-1 sm:flex-initial sm:w-auto sm:min-w-[160px]"
                ref={(el: HTMLInputElement | null) => {
                  refs.current[filter.key] = el;
                }}
              >
                <button
                  type="button"
                  onClick={() =>
                    setOpenRange((prev) => ({
                      ...prev,
                      [filter.key]: !prev[filter.key],
                    }))
                  }
                  className="w-full border border-light-border rounded-sm px-3 py-2 text-[#737373] text-[13px] bg-white flex items-center gap-2 justify-between cursor-pointer"
                >
                  <span>
                    {monthLabel(filter.value) ||
                      filter.defaultValue ||
                      "Select Month"}
                  </span>
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#666"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <rect
                      x="3"
                      y="4"
                      width="18"
                      height="18"
                      rx="2"
                      ry="2"
                    ></rect>
                    <line x1="16" y1="2" x2="16" y2="6"></line>
                    <line x1="8" y1="2" x2="8" y2="6"></line>
                    <line x1="3" y1="10" x2="21" y2="10"></line>
                  </svg>
                </button>
                {openRange[filter.key] && (
                  <div
                    className="absolute z-50 mt-2 bg-white shadow rounded p-2 w-[180px]"
                    ref={(el: HTMLInputElement | null) => {
                      refs.current[filter.key] = el;
                    }}
                  >
                    <div className="flex items-center justify-between mb-2 px-1">
                      <button
                        type="button"
                        onClick={() =>
                          setPickerYear((p) => ({
                            ...p,
                            [filter.key]: (p[filter.key] ?? currentYear) - 1,
                          }))
                        }
                        className="px-2 py-1 rounded hover:bg-gray-100"
                        aria-label="Previous year"
                      >
                        ‹
                      </button>
                      <div className="text-sm font-medium">
                        {pickerYear[filter.key] ?? currentYear}
                      </div>
                      <button
                        type="button"
                        onClick={() =>
                          setPickerYear((p) => ({
                            ...p,
                            [filter.key]: (p[filter.key] ?? currentYear) + 1,
                          }))
                        }
                        className="px-2 py-1 rounded hover:bg-gray-100"
                        aria-label="Next year"
                      >
                        ›
                      </button>
                    </div>
                    <div className="grid grid-cols-4 gap-1 px-1">
                      {monthNamesShort.map((m, i) => {
                        const isActive =
                          (pickerYear[filter.key] ?? currentYear) ===
                          selectedYear && selectedMonthIndex === i;
                        return (
                          <button
                            key={m}
                            type="button"
                            onClick={() => {
                              const y = pickerYear[filter.key] ?? currentYear;
                              const mm = String(i + 1).padStart(2, "0");
                              filter.changeFunc &&
                                filter.changeFunc({
                                  target: { value: `${y}-${mm}` },
                                });
                              setOpenRange((prev) => ({
                                ...prev,
                                [filter.key]: false,
                              }));
                            }}
                            className={`py-2 text-xs rounded ${isActive
                              ? "bg-blue-600 text-white"
                              : "hover:bg-gray-100"
                              }`}
                          >
                            {m}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>
            );
          }
          case FilterType.DATE_RANGE: {
            const start = filter.value?.startDate
              ? new Date(filter.value.startDate).toLocaleDateString("en-US", {
                month: "2-digit",
                day: "2-digit",
                year: "numeric",
              })
              : "";
            const end = filter.value?.endDate
              ? new Date(filter.value.endDate).toLocaleDateString("en-US", {
                month: "2-digit",
                day: "2-digit",
                year: "numeric",
              })
              : "";
            return (
              <div key={filter.key} className="relative flex-1 sm:flex-initial sm:w-auto sm:min-w-[200px]">
                <div className="relative">
                  <svg
                    className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2 pointer-events-none"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#666"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <rect
                      x="3"
                      y="4"
                      width="18"
                      height="18"
                      rx="2"
                      ry="2"
                    ></rect>
                    <line x1="16" y1="2" x2="16" y2="6"></line>
                    <line x1="8" y1="2" x2="8" y2="6"></line>
                    <line x1="3" y1="10" x2="21" y2="10"></line>
                  </svg>
                  <input
                    type="text"
                    readOnly
                    value={
                      start && end
                        ? `${start} - ${end}`
                        : filter.defaultValue || "Select Date"
                    }
                    title={start && end ? `${start} - ${end}` : ""}
                    onClick={() =>
                      setOpenRange((prev) => ({
                        ...prev,
                        [filter.key]: !prev[filter.key],
                      }))
                    }
                    className="w-full border border-light-border rounded-sm pl-10 pr-3 py-2 text-[#737373] text-[13px] bg-white focus:outline-none focus:ring-1 focus:ring-gray-300 cursor-pointer truncate"
                  />
                </div>
                {openRange[filter.key] && (
                  <div
                    className="absolute z-50 mt-2 p-2 left-0 sm:left-auto"
                    ref={(el) => {
                      refs.current[filter.key] = el;
                    }}
                  >
                    <DateRange
                      editableDateInputs={true}
                      onChange={(item: any) => {
                        const sel = item.selection ?? item;

                        // Helper to format as YYYY-MM-DD using local time
                        const toLocal = (d?: Date) => {
                          if (!d) return undefined;
                          const year = d.getFullYear();
                          const month = String(d.getMonth() + 1).padStart(
                            2,
                            "0",
                          );
                          const day = String(d.getDate()).padStart(2, "0");
                          return `${year}-${month}-${day}`;
                        };

                        const normalized = {
                          startDate: toLocal(sel.startDate),
                          endDate: toLocal(sel.endDate),
                        };
                        filter.changeFunc(normalized);
                        setOpenRange((prev) => ({
                          ...prev,
                          [filter.key]: false,
                        }));
                      }}
                      moveRangeOnFirstSelection={false}
                      ranges={[
                        {
                          startDate: filter.value?.startDate
                            ? new Date(filter.value.startDate)
                            : new Date(),
                          endDate: filter.value?.endDate
                            ? new Date(filter.value.endDate)
                            : new Date(),
                          key: "selection",
                        },
                      ]}
                    />
                  </div>
                )}
              </div>
            );
          }
          default:
            return null;
        }
      })}

      {anyFilterActive && (
        <div className="flex items-center flex-shrink-0">
          <button
            onClick={() => {
              filters.forEach((f) => {
                try {
                  if (f.type === (FilterType as any).DATE_RANGE)
                    f.changeFunc && f.changeFunc({});
                  else f.changeFunc && f.changeFunc({ target: { value: "" } });
                } catch (err) { }
              });

              const resetYears: Record<string, number> = {};
              filters.forEach((f) => {
                if ((f.type as any) === FilterType.MONTH) {
                  resetYears[f.key] = new Date().getFullYear();
                }
              });
              setPickerYear(resetYears);

              if (onClear) onClear();
            }}
            type="button"
            className="w-full sm:w-auto border px-4 py-2 rounded-md text-sm border-light-border bg-white flex items-center justify-center gap-2 hover:bg-gray-50"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#555"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
            Clear
          </button>
        </div>
      )}
    </div>
  );
};

export default CommonFilter;
