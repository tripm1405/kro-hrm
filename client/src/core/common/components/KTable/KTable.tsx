import React from 'react';
import Table, { TablePaginationConfig, TableProps } from 'antd/es/table';
import type { FilterValue, SorterResult } from 'antd/es/table/interface';

export interface IKTableProps<RecordType = Record<string, any>>
  extends Omit<TableProps<RecordType>, 'onChange'> {
  onPaginate?: (props: TablePaginationConfig) => void;
  onFilter?: (props: Record<string, FilterValue | null>) => void;
  onSort?: (props: SorterResult<RecordType>[]) => void;
}

const KTable: React.FC<IKTableProps> = ({ onPaginate, onFilter, onSort, ...props }) => {
  return <Table
    showSorterTooltip={false}
    onChange={(pagination, filters, sorter, extra) => {
      switch (extra.action) {
        case 'paginate': {
          onPaginate?.(pagination);
          break;
        }
        case 'filter': {
          onFilter?.(filters);
          break;
        }
        case 'sort': {
          onSort?.(sorter instanceof Array ? sorter : [sorter]);
          break;
        }
        default: {
          break;
        }
      }
    }}
    {...props} />;
};

export default KTable;
