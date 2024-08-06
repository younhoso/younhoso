'use client';

import { ReactNode } from 'react';

import clsx from 'clsx';
import { pick } from 'dot-object';

import Loading from '@/components/Loading';

import { TableStyled } from './styled';

export interface TableColumn<T = unknown> {
  label?: ReactNode;
  field: string;
  render?: (data: T, i: number) => ReactNode;
  alignStart?: boolean;
  width?: string;
  noBorder?: (data: T) => boolean;
}

export interface TableProps<T = unknown> {
  className?: string;
  columns: TableColumn<T>[];
  datas: T[];
  dataKey: keyof T;
  fullWidth?: boolean;
  emptyText?: ReactNode;
  loading?: boolean;
  onClickRow?: (data: T) => void;
}

function Table<T = unknown>({
  className,
  columns,
  datas,
  dataKey,
  fullWidth = false,
  emptyText = '데이터가 없습니다.',
  loading = false,
  onClickRow,
}: TableProps<T>) {
  return (
    <TableStyled className={clsx('Table', fullWidth && 'fullWidth', className)}>
      <table>
        <thead>
          <tr>
            {columns.map((column, i) => (
              <td key={`${column.field}${i}`}>{column.label}</td>
            ))}
          </tr>
        </thead>

        {!loading && (
          <tbody>
            {datas.map((data, index) => (
              <tr
                onClick={() => onClickRow?.(data)}
                key={data[dataKey] + `${index}`}
                className={clsx(onClickRow && 'cursor')}
              >
                {columns.map((column, i) => (
                  <td
                    key={data[dataKey] + `${column.field}${i}`}
                    {...(column.width && { style: { width: column.width } })}
                    className={clsx(column.noBorder?.(data) && 'no-border')}
                  >
                    <div className={clsx('tdContent', column.alignStart && 'align-start')}>
                      {column.render ? column.render(data, index) : pick(column.field, data)}
                    </div>
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        )}
      </table>

      {!loading && datas.length === 0 && <div className="empty">{emptyText}</div>}

      {loading && (
        <div className="loading">
          <Loading height="440px" />
        </div>
      )}
    </TableStyled>
  );
}

export default Table;
