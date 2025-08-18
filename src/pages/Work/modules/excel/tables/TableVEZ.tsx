import React from "react";
import TableBase from "./TableBase";

interface TableProps {
  data: any[][];
  setData: (data: any[][]) => void;
}

const TableVEZ: React.FC<TableProps> = ({ data, setData }) => {
  return <TableBase title="Каталог ВЭЗ" sheetName="Каталог ВЭЗ" data={data} setData={setData} />;
};

export default TableVEZ;

