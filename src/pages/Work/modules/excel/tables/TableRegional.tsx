import React from "react";
import TableBase from "./TableBase";

interface TableProps {
  data: any[][];
  setData: (data: any[][]) => void;
}

const TableRegional: React.FC<TableProps> = ({ data, setData }) => {
  return <TableBase title="Региональные данные" sheetName="Региональные" data={data} setData={setData} />;
};

export default TableRegional;

