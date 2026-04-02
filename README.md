# React Table Components

A comprehensive, production-ready React table component library with advanced filtering, sorting, pagination, and customizable actions. Built with TypeScript and Tailwind CSS.

## Features

- ✅ **Dynamic Table Component** - Fully customizable with column configuration
- ✅ **Advanced Filtering** - Select, Input, Date, Date Range, and Month filters
- ✅ **Sorting** - Column-level sorting with visual indicators
- ✅ **Pagination** - Built-in pagination with customizable page sizes
- ✅ **Action Buttons** - Configurable row actions (Edit, Delete, Custom)
- ✅ **Loading States** - Skeleton loaders for better UX
- ✅ **Responsive Design** - Mobile-friendly table layouts
- ✅ **TypeScript Support** - Full type safety
- ✅ **Flexible Styling** - Tailwind CSS with customizable classes

## Installation

```bash
npm install @yourorg/react-table-components
# or
yarn add @yourorg/react-table-components
# or
pnpm add @yourorg/react-table-components
```

## Prerequisites

This package requires the following peer dependencies:

```json
{
  "react": ">=17",
  "react-dom": ">=17"
}
```

You also need Tailwind CSS configured in your project.

## Quick Start

### 1. Import Styles

Import the CSS in your main entry file:

```tsx
import '@yourorg/react-table-components/dist/index.css';
```

### 2. Basic Usage

```tsx
import { BasicTable, ColumnBuilder } from '@yourorg/react-table-components';

interface Product {
  id: number;
  name: string;
  price: number;
  status: string;
}

function MyTable() {
  const data: Product[] = [
    { id: 1, name: 'Product A', price: 100, status: 'active' },
    { id: 2, name: 'Product B', price: 200, status: 'inactive' },
  ];

  const columns = [
    new ColumnBuilder<Product>()
      .header('Product Name')
      .accessor('name')
      .sortable()
      .build(),
    
    new ColumnBuilder<Product>()
      .header('Price')
      .accessor('price')
      .alignment('right')
      .render((row) => `$${row.price}`)
      .build(),
  ];

  return (
    <BasicTable
      columns={columns}
      data={data}
      total={data.length}
      totalPages={1}
      page={1}
    />
  );
}
```

## Components

### BasicTable

Main table component with full feature support.

**Props:**

```typescript
interface BasicTableProps<T> {
  columns: Column<T>[];              // Column definitions
  data: T[];                         // Table data
  actionColumn?: ActionColumnConfig; // Action buttons config
  sortBy?: string;                   // Current sort column
  sortOrder?: 'asc' | 'desc';       // Sort direction
  onSort?: (key: string, order: 'asc' | 'desc') => void;
  isLoading?: boolean;               // Loading state
  noDataMessage?: string;            // Empty state message
  page?: number;                     // Current page
  setPage?: (page: number) => void;  // Page change handler
  total?: number;                    // Total records
  totalPages?: number;               // Total pages
  tableHeader?: TableHeaderConfig;   // Header with filters
}
```

### ColumnBuilder

Fluent API for building column configurations.

```typescript
const column = new ColumnBuilder<Product>()
  .header('Product Name')           // Column header text
  .accessor('name')                 // Data accessor key
  .alignment('left')                // left | center | right
  .sortable('name')                 // Enable sorting
  .width('30%')                     // Column width
  .icon(<Icon />)                   // Header icon
  .render((row) => <Custom />)      // Custom cell renderer
  .className('custom-class')        // Custom CSS class
  .build();
```

### CommonFilter

Advanced filter component with multiple filter types.

```typescript
import { CommonFilter, FilterType } from '@yourorg/react-table-components';

const filters = [
  {
    key: 'status',
    type: FilterType.SELECT,
    label: 'Status',
    options: [
      { label: 'Active', value: 'active' },
      { label: 'Inactive', value: 'inactive' },
    ],
    value: selectedStatus,
    changeFunc: (e) => setSelectedStatus(e.target.value),
  },
  {
    key: 'search',
    type: FilterType.INPUT,
    label: 'Search',
    placeholder: 'Search products...',
    value: searchTerm,
    changeFunc: (e) => setSearchTerm(e.target.value),
  },
  {
    key: 'dateRange',
    type: FilterType.DATE_RANGE,
    label: 'Date Range',
    value: { startDate: new Date(), endDate: new Date() },
    changeFunc: (range) => setDateRange(range),
  },
];

<CommonFilter filters={filters} onClear={() => clearFilters()} />
```

### TableHeader

Header component with total count and inline filters.

```typescript
const tableHeader = {
  totalCount: 150,
  filters: [
    {
      key: 'category',
      type: 'select',
      label: 'Category',
      value: category,
      onChange: (value) => setCategory(value),
      options: [
        { label: 'Electronics', value: 'electronics' },
        { label: 'Clothing', value: 'clothing' },
      ],
    },
  ],
  actions: <button>Add New</button>,
};

<BasicTable tableHeader={tableHeader} {...otherProps} />
```

## Advanced Examples

### With Action Buttons

```typescript
import { ActionColumnBuilder, ActionButtonBuilder } from '@yourorg/react-table-components';

const actionColumn = new ActionColumnBuilder()
  .show(true)
  .alignment('right')
  .actions([
    new ActionButtonBuilder()
      .type('edit')
      .label('Edit')
      .icon(<EditIcon />)
      .onClick((row) => handleEdit(row))
      .className('text-blue-500')
      .build(),
    
    new ActionButtonBuilder()
      .type('delete')
      .label('Delete')
      .icon(<DeleteIcon />)
      .onClick((row) => handleDelete(row))
      .className('text-red-500')
      .build(),
  ])
  .build();

<BasicTable actionColumn={actionColumn} {...props} />
```

### With Sorting

```typescript
const [sortBy, setSortBy] = useState('');
const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');

const handleSort = (key: string, order: 'asc' | 'desc') => {
  setSortBy(key);
  setSortOrder(order);
  // Fetch sorted data from API
};

<BasicTable
  sortBy={sortBy}
  sortOrder={sortOrder}
  onSort={handleSort}
  {...props}
/>
```

### With Pagination

```typescript
const [page, setPage] = useState(1);
const [data, setData] = useState([]);
const totalPages = Math.ceil(totalRecords / pageSize);

<BasicTable
  page={page}
  setPage={setPage}
  total={totalRecords}
  totalPages={totalPages}
  data={data}
  {...props}
/>
```

### Custom Column Renderers

```typescript
const columns = [
  new ColumnBuilder<Product>()
    .header('Status')
    .accessor('status')
    .render((row) => (
      <span className={row.status === 'active' ? 'text-green-600' : 'text-red-600'}>
        {row.status.toUpperCase()}
      </span>
    ))
    .build(),
  
  createCurrencyColumn<Product>('Price', 'price', {
    currency: 'USD',
    sortable: true,
  }),
  
  createDateColumn<Product>('Created', 'createdDate', {
    format: 'long',
    sortable: true,
  }),
];
```

## Filter Types

### SELECT
Dropdown filter with options.

### INPUT
Text input filter with optional icon.

### DATE
Single date picker.

### DATE_RANGE
Date range picker with start and end dates.

### MONTH
Month and year picker.

## Styling

The package uses Tailwind CSS. Ensure you have Tailwind configured in your project:

```javascript
// tailwind.config.js
module.exports = {
  content: [
    './src/**/*.{js,jsx,ts,tsx}',
    './node_modules/table-components-react/dist/**/*.{js,mjs}',
  ],
  // ... rest of config
};
```

## TypeScript Support

Full TypeScript support with generic types:

```typescript
interface MyData {
  id: number;
  name: string;
}

const columns: Column<MyData>[] = [...];
<BasicTable<MyData> columns={columns} data={data} />
```

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Contributing

Contributions are welcome! Please open an issue or submit a pull request.

<!-- ## License

MIT -->

## Support

For issues and questions, please open an issue on [GitHub](https://github.com/yourusername/react-table-components/issues).
