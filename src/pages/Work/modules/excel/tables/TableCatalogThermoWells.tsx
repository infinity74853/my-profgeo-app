import React from "react";
import TableBase from "./TableBase";

interface TableProps {
  data: any[][];
  setData: (data: any[][]) => void;
}

const TableCatalogThermoWells: React.FC<TableProps> = ({ data, setData }) => {
  return <TableBase title="Каталог скважин для термометрии" sheetName="Каталог термоскважин" data={data} setData={setData} />;
};

export default TableCatalogThermoWells;

