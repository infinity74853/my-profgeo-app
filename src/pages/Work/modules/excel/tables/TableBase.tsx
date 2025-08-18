import React, { useState } from "react";
import { HotTable } from "@handsontable/react";
import * as XLSX from "xlsx";

interface TableBaseProps {
  title: string;
  sheetName: string;
  data: any[][];
  setData: (data: any[][]) => void;
}

const TableBase: React.FC<TableBaseProps> = ({ title, sheetName, data, setData }) => {
  const [fileName, setFileName] = useState<string>("");

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setFileName(file.name);

    const reader = new FileReader();
    reader.onload = (event) => {
      const arrayBuffer = event.target?.result;
      if (!arrayBuffer) return;

      const workbook = XLSX.read(arrayBuffer, { type: "array" });
      const sheetName = workbook.SheetNames[0];
      const sheet = workbook.Sheets[sheetName];
      let sheetData = XLSX.utils.sheet_to_json(sheet, { header: 1 }) as any[][];

      const maxCols = Math.max(...sheetData.map((row) => row.length));
      const normalized = sheetData.map((row) =>
        Array.from({ length: maxCols }, (_, i) => row[i] ?? "")
      );

      setData(normalized);
    };
    reader.readAsArrayBuffer(file);
  };

  const handleDownload = () => {
    const worksheet = XLSX.utils.aoa_to_sheet(data);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, sheetName);
    XLSX.writeFile(workbook, `${sheetName}.xlsx`);
  };

  const addRow = () => {
    setData([...data, Array(data[0]?.length || 1).fill("")]);
  };

  const removeRow = () => {
    if (data.length > 1) {
      setData(data.slice(0, -1));
    }
  };

  return (
    <div>
      <h3 style={{ marginBottom: 10 }}>{title}</h3>

      <HotTable
        data={data}
        colHeaders={true}
        rowHeaders={true}
        width="100%"
        height="400px"
        stretchH="all"
        autoColumnSize={true}
        licenseKey="non-commercial-and-evaluation"
        afterChange={(changes, source) => {
          if (source !== "loadData" && changes) {
            setData([...data]);
          }
        }}
      />

      <div style={{ marginTop: 15, display: "flex", gap: 10, alignItems: "center" }}>
        <label style={{ cursor: "pointer" }}>
          <input type="file" accept=".xlsx,.xls" onChange={handleFileUpload} style={{ display: "none" }} />
          <span style={{ padding: "6px 12px", border: "1px solid #ccc", borderRadius: 4 }}>
            Выберите файл
          </span>
        </label>
        {fileName && <span style={{ fontSize: 14 }}>📄 {fileName}</span>}

        <button onClick={handleDownload}>Экспорт текущей</button>
        <button onClick={addRow}>Добавить строку</button>
        <button onClick={removeRow}>Удалить строку</button>
      </div>
    </div>
  );
};

export default TableBase;
