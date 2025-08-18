import React from "react";
import TableBase from "./TableBase";

interface TableProps {
  data: any[][];
  setData: (data: any[][]) => void;
}

const TableConclusions: React.FC<TableProps> = ({ data, setData }) => {
  return <TableBase title="Выводы" sheetName="Выводы" data={data} setData={setData} />;
};

export default TableConclusions;

