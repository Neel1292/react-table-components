export interface ActionButton {
  type: 'edit' | 'delete' | 'custom'
  label?: string
  icon?: React.ReactNode
  onClick: (row: any) => void
  className?: string
}

export interface Column<T> {
  // Basic config
  header: string
  accessor: keyof T | string
  
  // Rendering & styling
  render?: (row: T) => React.ReactNode
  className?: string
  
  // Dynamic features
  alignment?: 'left' | 'center' | 'right'
  sortable?: boolean
  sortKey?: string // Custom key for sorting if different from accessor
  width?: string | number // e.g., "20%", 200
  
  // Icon support
  icon?: React.ReactNode
  showIcon?: (row: T) => boolean // Conditional icon display
  
  // Action handlers - Users can define these at column level
  onEdit?: (row: T) => void
  onDelete?: (row: T) => void
  onCustomAction?: (row: T, actionType: string) => void
}

export interface ActionColumnConfig {
  show?: boolean
  actions?: ActionButton[]
  alignment?: 'left' | 'center' | 'right'
  customRender?: (row: any, actions: ActionButton[]) => React.ReactNode
}

export interface TableHeaderFilterConfig {
  key: string
  type: 'select' | 'date' | 'input'
  label: string
  placeholder?: string
  value: string | Date | null
  onChange: (value: string | Date | null) => void
  options?: { label: string; value: string }[] // For select type
  icon?: React.ReactNode // For input type
}

export interface TableHeaderConfig {
  showTotal?: boolean
  totalCount?: number
  filters?: TableHeaderFilterConfig[]
  actions?: React.ReactNode
}

export interface BasicTableProps<T> {
  columns: Column<T>[]
  data: T[]
  
  // Action buttons configuration
  actionColumn?: ActionColumnConfig
  
  // Sorting
  sortBy?: string
  sortOrder?: 'asc' | 'desc'
  onSort?: (sortBy: string, sortOrder: 'asc' | 'desc') => void
  
  // Loading & empty states
  isLoading?: boolean
  skeletonRowCount?: number
  skeletonColumnCount?: number
  noDataMessage?: string
  
  // Pagination
  page?: number
  pageSize?: number
  setPage?: (page: number) => void
  onPageChange?: (page: number) => void
  total?: number
  totalPages?: number
  
  // Header configuration (Total + Filters)
  tableHeader?: TableHeaderConfig
}