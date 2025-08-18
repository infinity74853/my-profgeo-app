export type Cell = string | number | boolean | null;

export interface ExcelTableProps {
  data: Cell[][];
  onChange: (data: Cell[][]) => void;
}