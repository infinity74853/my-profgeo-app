import React from "react";
import TableBase from "./TableBase";

interface TableProps {
  data: any[][];
  setData: (data: any[][]) => void;
}

const TableVEZData: React.FC<TableProps> = ({ data, setData }) => {
  return <TableBase title="Данные ВЭЗ" sheetName="Данные ВЭЗ" data={data} setData={setData} />;
};

export default TableVEZData;

