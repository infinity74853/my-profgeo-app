import React from "react";
import TableBase from "./TableBase";

interface TableProps {
  data: any[][];
  setData: (data: any[][]) => void;
}

const TableMain: React.FC<TableProps> = ({ data, setData }) => {
  return <TableBase title="Основное" sheetName="Основное" data={data} setData={setData} />;
};

export default TableMain;

