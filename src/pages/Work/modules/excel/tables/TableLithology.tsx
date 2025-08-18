import React from "react";
import TableBase from "./TableBase";

interface TableProps {
  data: any[][];
  setData: (data: any[][]) => void;
}

const TableLithology: React.FC<TableProps> = ({ data, setData }) => {
  return <TableBase title="Литологический разрез" sheetName="Литология" data={data} setData={setData} />;
};

export default TableLithology;
