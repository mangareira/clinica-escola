import { ColumnDef, Row } from '@tanstack/react-table'

export interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  filterkey: string;
  onDelete: (row: Row<TData>[]) => void;
  disabled?: boolean;
  placeholder?: string;
  title: string,
  text: string
}