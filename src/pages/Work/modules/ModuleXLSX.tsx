import React, { useState } from "react";
import * as XLSX from "xlsx";

const ModuleXLSX: React.FC = () => {
  const [data, setData] = useState<any[][]>([]);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (evt) => {
      const bstr = evt.target?.result;
      const wb = XLSX.read(bstr, { type: "binary" });
      const wsname = wb.SheetNames[0];
      const ws = wb.Sheets[wsname];
      const jsonData = XLSX.utils.sheet_to_json(ws, { header: 1 });
      setData(jsonData as any[][]);
    };
    reader.readAsBinaryString(file);
  };

  return (
    <div>
      <h2>Модуль XLSX</h2>
      <input type="file" onChange={handleFileUpload} />
      <table border={1} style={{ marginTop: 10 }}>
        <tbody>
          {data.map((row, i) => (
            <tr key={i}>
              {row.map((cell, j) => (
                <td key={j}>{cell}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ModuleXLSX;
