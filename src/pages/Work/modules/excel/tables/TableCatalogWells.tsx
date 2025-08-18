import React from "react";
import TableBase from "./TableBase";

interface TableProps {
  data: any[][];
  setData: (data: any[][]) => void;
}

const TableCatalogWells: React.FC<TableProps> = ({ data, setData }) => {
  return <TableBase title="Каталог скважин" sheetName="Каталог скважин" data={data} setData={setData} />;
};

export default TableCatalogWells;
