import React from "react";
import TableBase from "./TableBase";

interface TableProps {
  data: any[][];
  setData: (data: any[][]) => void;
}

const TableThermo: React.FC<TableProps> = ({ data, setData }) => {
  return <TableBase title="Данные термометрии" sheetName="Термометрия" data={data} setData={setData} />;
};

export default TableThermo;

