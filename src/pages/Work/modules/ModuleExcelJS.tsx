import React, { useState } from "react";
import ExcelJS from "exceljs";

const ModuleExcelJS: React.FC = () => {
  const [data, setData] = useState<(string | number | boolean | null)[][]>([]);

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const workbook = new ExcelJS.Workbook();
    await workbook.xlsx.load(await file.arrayBuffer());
    const worksheet = workbook.worksheets[0];

    const rows: (string | number | boolean | null)[][] = [];

    worksheet.eachRow((row) => {
      let rawValues: ExcelJS.CellValue[];

      if (Array.isArray(row.values)) {
        rawValues = row.values.slice(1); // убираем пустой индекс 0
      } else {
        rawValues = Object.values(row.values);
      }

      // приводим все значения к string | number | boolean | null
      const values = rawValues.map((v) =>
        v === undefined ? null : (v as string | number | boolean | null)
      );

      rows.push(values);
    });

    setData(rows);
  };

  return (
    <div>
      <h2>Модуль ExcelJS</h2>
      <input type="file" onChange={handleFileUpload} />
      <table border={1} style={{ marginTop: 10 }}>
        <tbody>
          {data.map((row, i) => (
            <tr key={i}>
              {row.map((cell, j) => (
                <td key={j}>{cell !== null ? cell.toString() : ""}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ModuleExcelJS;


