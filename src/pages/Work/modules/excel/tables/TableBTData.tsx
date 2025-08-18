import React from "react";
import TableBase from "./TableBase";

interface TableProps {
  data: any[][];
  setData: (data: any[][]) => void;
}

const TableBTData: React.FC<TableProps> = ({ data, setData }) => {
  return <TableBase title="Данные БТ" sheetName="Данные БТ" data={data} setData={setData} />;
};

export default TableBTData;

