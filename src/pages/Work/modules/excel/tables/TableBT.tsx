import React from "react";
import TableBase from "./TableBase";

interface TableProps {
  data: any[][];
  setData: (data: any[][]) => void;
}

const TableBT: React.FC<TableProps> = ({ data, setData }) => {
  return <TableBase title="Каталог БТ" sheetName="Каталог БТ" data={data} setData={setData} />;
};

export default TableBT;
