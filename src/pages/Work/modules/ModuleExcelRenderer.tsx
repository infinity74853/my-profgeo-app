import React, { useState } from "react";
import { ExcelRenderer } from "react-excel-renderer";

const ModuleExcelRenderer: React.FC = () => {
  const [rows, setRows] = useState<any[][]>([]);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    ExcelRenderer(file, (err: any, resp: any) => {
      if (err) {
        console.error(err);
      } else {
        setRows(resp.rows);
      }
    });
  };

  return (
    <div>
      <h2>Модуль React-Excel-Renderer</h2>
      <input type="file" onChange={handleFileUpload} />
      <table border={1} style={{ marginTop: 10 }}>
        <tbody>
          {rows.map((row, i) => (
            <tr key={i}>
              {row.map((cell: any, j: number) => (
                <td key={j}>{cell}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ModuleExcelRenderer;
