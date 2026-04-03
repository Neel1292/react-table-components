import React, { useState } from 'react';
import BasicTable from '../components/common/table/BasicTable';
import { ColumnBuilder, createCurrencyColumn, createDateColumn } from '../components/common/table/columnConfig';
import { Column, ActionColumnConfig } from '../components/common/table/types';

interface TestProduct {
  id: number;
  name: string;
  price: number;
  rating: number;
  createdDate: string;
  status: 'active' | 'inactive';
}

export function TableTestPage() {
  const [sortBy, setSortBy] = useState('');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');

  const testData: TestProduct[] = Array.from({ length: 12 }, (_, i) => ({
    id: i + 1,
    name: `Product ${String.fromCharCode(65 + i)}`,
    price: (i + 1) * 15,
    rating: 3.5 + (i % 5) * 0.3,
    createdDate: `2026-0${(i % 9) + 1}-15`,
    status: i % 3 === 0 ? 'inactive' : 'active',
  }));

  // Define Columns with Various Features
  const columns: Column<TestProduct>[] = [
    new ColumnBuilder<TestProduct>()
      .header('Product Name')
      .accessor('name')
      .alignment('left')
      .sortable()
      .width('25%')
      .icon('📦')
      .onEdit((row) => console.log('Edit column handler:', row.name))
      .onDelete((row) => console.log('Delete column handler:', row.name))
      .build(),

    new ColumnBuilder<TestProduct>()
      .header('Rating')
      .accessor('rating')
      .alignment('center')
      .sortable()
      .render((row) => `⭐ ${row.rating.toFixed(1)}`)
      .build(),

    createCurrencyColumn<TestProduct>('Price', 'price', {
      alignment: 'right',
      sortable: true,
    }),

    createDateColumn<TestProduct>('Created', 'createdDate', {
      format: 'short',
      sortable: true,
    }),

    new ColumnBuilder<TestProduct>()
      .header('Status')
      .accessor('status')
      .alignment('center')
      .render((row) => (
        <span className={row.status === 'active' ? 'text-green-600 font-bold' : 'text-red-600 font-bold'}>
          {row.status.toUpperCase()}
        </span>
      ))
      .build(),
  ];

  // Define Action Buttons
  const actionConfig: ActionColumnConfig = {
    show: true,
    alignment: 'right',
    actions: [
      {
        type: 'edit',
        label: 'Edit',
        icon: '✏️',
        onClick: (row: TestProduct) => {
          console.log('Edit clicked for:', row.name);
          alert(`Edit: ${row.name}`);
        },
      },
      {
        type: 'delete',
        label: 'Delete',
        icon: '🗑️',
        onClick: (row: TestProduct) => {
          console.log('Delete clicked for:', row.name);
          alert(`Delete: ${row.name}`);
        },
      },
    ],
  };

  const handleSort = (key: string, order: 'asc' | 'desc') => {
    setSortBy(key);
    setSortOrder(order);
    console.log(`Sorted by: ${key}, Order: ${order}`);
  };

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold mb-2 text-gray-800">Dynamic Table Test</h1>
      <p className="text-gray-600 mb-6">Testing all dynamic features - Sorting, Alignment, Icons, Custom Rendering, and Action Handlers</p>

      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        <BasicTable<TestProduct>
          columns={columns}
          data={testData}
          actionColumn={actionConfig}
          sortBy={sortBy}
          sortOrder={sortOrder}
          onSort={handleSort}
          pageSize={5}
          total={testData.length}
          isLoading={false}
          noDataMessage="No products found"
        />
      </div>

      {/* Debug Info */}
      <div className="mt-6 p-4 bg-gray-100 rounded border border-gray-300">
        <h3 className="font-bold text-gray-800">🔍 Debug Info:</h3>
        <p className="text-sm text-gray-700">Sort By: <span className="font-mono bg-gray-200 px-2 py-1 rounded">{sortBy || 'none'}</span></p>
        <p className="text-sm text-gray-700">Sort Order: <span className="font-mono bg-gray-200 px-2 py-1 rounded">{sortOrder}</span></p>
        <p className="text-sm text-gray-700">Total Rows: <span className="font-mono bg-gray-200 px-2 py-1 rounded">{testData.length}</span></p>
      </div>

      {/* Instructions */}
      <div className="mt-6 p-4 bg-blue-50 rounded border border-blue-300">
        <h3 className="font-bold text-blue-900">📋 Test Checklist:</h3>
        <ul className="text-sm text-blue-900 list-disc list-inside space-y-1">
          <li>✅ Click column headers to test sorting</li>
          <li>✅ Check that text alignment is correct (left/center/right)</li>
          <li>✅ Look for icons (📦 in header, ⭐ in rating, ✏️ ✓ in actions)</li>
          <li>✅ Click Edit/Delete buttons to test action handlers</li>
          <li>✅ Open DevTools (F12) → Console to see handler logs</li>
          <li>✅ Check that prices show currency format ($100.00)</li>
          <li>✅ Check that status colors are green (active) or red (inactive)</li>
        </ul>
      </div>
    </div>
  );
}

export default TableTestPage;
