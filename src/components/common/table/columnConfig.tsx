import React from 'react';
import { Column, ActionColumnConfig, ActionButton } from './types';

/**
 * DYNAMIC TABLE CONFIGURATION UTILITIES
 * Helper functions and patterns for configuring dynamic tables
 */
export const TableIcons = {
  edit: () => <span className="text-blue-500">✏️</span>,
  delete: () => <span className="text-red-500">🗑️</span>,
  view: () => <span className="text-green-500">👁️</span>,
  sort: () => <span className="text-gray-300">↕</span>,
  sortAsc: () => <span className="text-black">↑</span>,
  sortDesc: () => <span className="text-black">↓</span>,
};

// Or use emoji strings directly
export const TableIconsEmoji = {
  edit: '✏️',
  delete: '🗑️',
  view: '👁️',
  sort: '↕',
  sortAsc: '↑',
  sortDesc: '↓',
};

// ============================================
// COLUMN BUILDER - Fluent API for creating columns
// ============================================
export class ColumnBuilder<T> {
  private column: Column<T> = {
    header: '',
    accessor: '' as keyof T,
  };

  header(value: string): this {
    this.column.header = value;
    return this;
  }

  accessor(key: keyof T | string): this {
    this.column.accessor = key;
    return this;
  }

  alignment(align: 'left' | 'center' | 'right'): this {
    this.column.alignment = align;
    return this;
  }

  sortable(key?: string): this {
    this.column.sortable = true;
    if (key) this.column.sortKey = key;
    return this;
  }

  width(value: string | number): this {
    this.column.width = value;
    return this;
  }

  icon(icon: React.ReactNode, showCondition?: (row: T) => boolean): this {
    this.column.icon = icon;
    if (showCondition) this.column.showIcon = showCondition;
    return this;
  }

  render(fn: (row: T) => React.ReactNode): this {
    this.column.render = fn;
    return this;
  }

  className(cls: string): this {
    this.column.className = cls;
    return this;
  }

  onEdit(handler: (row: any) => void): this {
    this.column.onEdit = handler;
    return this;
  }

  onDelete(handler: (row: any) => void): this {
    this.column.onDelete = handler;
    return this;
  }

  onCustomAction(handler: (row: any, actionType: string) => void): this {
    this.column.onCustomAction = handler;
    return this;
  }

  build(): Column<T> {
    return this.column;
  }
}

// ============================================
// ACTION BUTTON BUILDER
// ============================================
export class ActionButtonBuilder {
  private action: ActionButton = {
    type: 'custom',
    onClick: () => {},
  };

  type(type: 'edit' | 'delete' | 'custom'): this {
    this.action.type = type;
    return this;
  }

  label(value: string): this {
    this.action.label = value;
    return this;
  }

  icon(icon: React.ReactNode): this {
    this.action.icon = icon;
    return this;
  }

  onClick(handler: (row: any) => void): this {
    this.action.onClick = handler;
    return this;
  }

  className(cls: string): this {
    this.action.className = cls;
    return this;
  }

  build(): ActionButton {
    return this.action;
  }
}

// ============================================
// ACTION COLUMN BUILDER
// ============================================
export class ActionColumnBuilder {
  private config: ActionColumnConfig = {
    show: true,
    actions: [],
    alignment: 'right',
  };

  show(value: boolean): this {
    this.config.show = value;
    return this;
  }

  actions(actions: ActionButton[]): this {
    this.config.actions = actions;
    return this;
  }

  addAction(action: ActionButton): this {
    this.config.actions?.push(action);
    return this;
  }

  alignment(align: 'left' | 'center' | 'right'): this {
    this.config.alignment = align;
    return this;
  }

  customRender(
    fn: (row: any, actions: ActionButton[]) => React.ReactNode
  ): this {
    this.config.customRender = fn;
    return this;
  }

  build(): ActionColumnConfig {
    return this.config;
  }
}

// ============================================
// PRESET CONFIGURATIONS
// ============================================

/**
 * Create action buttons from column handlers
 * Useful when you define onEdit/onDelete at the column level
 */
export function createActionsFromColumn<T>(
  column: Column<T>,
  options?: {
    editLabel?: string
    deleteLabel?: string
    editIcon?: React.ReactNode
    deleteIcon?: React.ReactNode
    editClassName?: string
    deleteClassName?: string
  }
): ActionButton[] {
  const actions: ActionButton[] = [];

  if (column.onEdit) {
    actions.push(
      new ActionButtonBuilder()
        .type('edit')
        .label(options?.editLabel || 'Edit')
        .icon(options?.editIcon || TableIcons.edit())
        .onClick((row) => column.onEdit?.(row))
        .className(options?.editClassName || 'text-blue-500 hover:text-blue-700')
        .build()
    );
  }

  if (column.onDelete) {
    actions.push(
      new ActionButtonBuilder()
        .type('delete')
        .label(options?.deleteLabel || 'Delete')
        .icon(options?.deleteIcon || TableIcons.delete())
        .onClick((row) => column.onDelete?.(row))
        .className(options?.deleteClassName || 'text-red-500 hover:text-red-700')
        .build()
    );
  }

  return actions;
}
export function createBasicActions(
  onEdit: (row: any) => void,
  onDelete: (row: any) => void
): ActionButton[] {
  return [
    new ActionButtonBuilder()
      .type('edit')
      .label('Edit')
      .icon(TableIcons.edit())
      .onClick(onEdit)
      .className('text-blue-500 hover:text-blue-700')
      .build(),

    new ActionButtonBuilder()
      .type('delete')
      .label('Delete')
      .icon(TableIcons.delete())
      .onClick(onDelete)
      .className('text-red-500 hover:text-red-700')
      .build(),
  ];
}

/**
 * View-only actions configuration
 */
export function createViewAction(onView: (row: any) => void): ActionButton[] {
  return [
    new ActionButtonBuilder()
      .type('custom')
      .label('View')
      .icon(TableIcons.view())
      .onClick(onView)
      .className('text-green-500 hover:text-green-700')
      .build(),
  ];
}

/**
 * Create currency column
 */
export function createCurrencyColumn<T>(
  header: string,
  accessor: keyof T,
  options?: {
    alignment?: 'left' | 'center' | 'right';
    sortable?: boolean;
    currency?: string;
    width?: string | number;
  }
): Column<T> {
  const builder = new ColumnBuilder<T>()
    .header(header)
    .accessor(accessor)
    .alignment(options?.alignment || 'right')
    .render((row) => {
      const value = (row as any)[accessor] as number;
      return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: options?.currency || 'USD',
      }).format(value);
    });

  if (options?.sortable) builder.sortable();
  if (options?.width) builder.width(options.width);

  return builder.build();
}

/**
 * Create date column with formatting
 */
export function createDateColumn<T>(
  header: string,
  accessor: keyof T,
  options?: {
    alignment?: 'left' | 'center' | 'right';
    sortable?: boolean;
    format?: 'short' | 'long' | 'full';
    width?: string | number;
  }
): Column<T> {
  const dateFormat = (date: any) => {
    if (!date) return '-';
    const d = new Date(date);
    switch (options?.format) {
      case 'long':
        return d.toLocaleDateString('en-US', {
          year: 'numeric',
          month: 'long',
          day: 'numeric',
        });
      case 'full':
        return d.toLocaleDateString('en-US', {
          weekday: 'long',
          year: 'numeric',
          month: 'long',
          day: 'numeric',
        });
      default:
        return d.toLocaleDateString('en-US');
    }
  };

  const builder = new ColumnBuilder<T>()
    .header(header)
    .accessor(accessor)
    .alignment(options?.alignment || 'center')
    .render((row) => dateFormat((row as any)[accessor]));

  if (options?.sortable) builder.sortable();
  if (options?.width) builder.width(options.width);

  return builder.build();
}

/**
 * Create status column with badge
 */
export function createStatusColumn<T>(
  header: string,
  accessor: keyof T,
  statusMap?: Record<string, { label: string; color: string }>,
  options?: {
    alignment?: 'left' | 'center' | 'right';
    sortable?: boolean;
    width?: string | number;
  }
): Column<T> {
  const defaultStatusMap: Record<string, { label: string; color: string }> = {
    active: { label: 'Active', color: 'green' },
    inactive: { label: 'Inactive', color: 'gray' },
    pending: { label: 'Pending', color: 'yellow' },
  };

  const statusConfig: Record<string, { label: string; color: string }> = statusMap || defaultStatusMap;

  const builder = new ColumnBuilder<T>()
    .header(header)
    .accessor(accessor)
    .alignment(options?.alignment || 'center')
    .render((row) => {
      const value = (row as any)[accessor] as string;
      const status = statusConfig[value] || { label: value, color: 'gray' };
      const colorClasses: Record<string, string> = {
        green: 'bg-green-100 text-green-800',
        red: 'bg-red-100 text-red-800',
        yellow: 'bg-yellow-100 text-yellow-800',
        blue: 'bg-blue-100 text-blue-800',
        gray: 'bg-gray-100 text-gray-800',
      };

      return (
        <span
          className={`px-3 py-1 rounded-full text-xs font-semibold ${colorClasses[status.color]}`}
        >
          {status.label}
        </span>
      );
    });

  if (options?.sortable) builder.sortable();
  if (options?.width) builder.width(options.width);

  return builder.build();
}

// ============================================
// EXAMPLE USAGE
// ============================================
/**
 * 
 * // Using builders
 * const columns = [
 *   new ColumnBuilder<Product>()
 *     .header('Product Name')
 *     .accessor('name')
 *     .alignment('left')
 *     .sortable('name')
 *     .width('30%')
 *     .build(),
 *   
 *   createCurrencyColumn<Product>('Price', 'price', { sortable: true }),
 *   
 *   createDateColumn<Product>('Created', 'createdDate', { format: 'short' }),
 *   
 *   createStatusColumn<Product>('Status', 'status'),
 * ];
 * 
 * const actions = new ActionColumnBuilder()
 *   .actions(createBasicActions(
 *     (row) => console.log('Edit', row),
 *     (row) => console.log('Delete', row)
 *   ))
 *   .build();
 */
