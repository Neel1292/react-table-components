// filterTypeEnum.ts
export enum FilterType {
  SELECT = "select",
  INPUT = "input",
  DATE = "date",
  DATE_RANGE = "date_range",
  MONTH = "month", // new
}

export interface FilterOption {
  label?: string;
  name?: string;
  value: string;
  _id?: string;
}

export interface DateRangeValue {
  startDate: Date;
  endDate: Date;
}

/**
 * changeFunc signatures use an event-like shape (to match your existing usage where you
 * typically call filter.changeFunc(e) or filter.changeFunc({ target: { value: '...' } }))
 */
export type FilterConfig =
  | {
      key: string;
      type: FilterType.SELECT;
      label?: string;
      name?: string;
      options: FilterOption[];
      defaultValue?: string;
      value?: string;
      changeFunc: (e: any) => void; // receives event-like object
    }
  | {
      key: string;
      type: FilterType.INPUT;
      label: string;
      placeholder?: string;
      defautlValue?: string;
      icon?: React.ReactNode;
      value?: string;
      changeFunc: (e: any) => void;
    }
  | {
      key: string;
      type: FilterType.DATE;
      label: string;
      value?: string; // string (yyyy-mm-dd)
      changeFunc: (e: any) => void;
    }
  | {
      key: string;
      type: FilterType.DATE_RANGE;
      label: string;
      value?: DateRangeValue | any | undefined;
      defaultValue: string;
      changeFunc: (value: DateRangeValue | any) => void;
    }
  | {
      key: string;
      type: FilterType.MONTH;
      label: string;
      value?: string; // "YYYY-MM" format (or empty)
      defaultValue?: string;
      changeFunc: (e: any) => void; // receives event-like object with target.value = "YYYY-MM" or empty
    };
