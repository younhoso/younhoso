import TableMobile from './mobile/TableMobile';
import _Table from './pc/Table';

type TableP = typeof _Table;

interface TableType extends TableP {
  Mobile: typeof TableMobile;
}

const Table = _Table as TableType;

Table.Mobile = TableMobile;

export default Table;
