import React from "react";
import TableBase from "./TableBase";

interface TableProps {
  data: any[][];
  setData: (data: any[][]) => void;
}

const TableIGE: React.FC<TableProps> = ({ data, setData }) => {
  return <TableBase title="Перечень ИГЭ" sheetName="ИГЭ" data={data} setData={setData} />;
};

export default TableIGE;

