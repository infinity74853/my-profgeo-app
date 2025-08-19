import React, { useRef, useState } from "react";
import { HotTable, type HotTableClass } from "@handsontable/react";
import Handsontable from "handsontable";
import { registerAllModules } from "handsontable/registry";
import type { CopyPaste as CopyPastePlugin } from "handsontable/plugins/copyPaste";
import * as XLSX from "xlsx";

// ✅ обязательно для v16: регистрируем все модули (в т.ч. CopyPaste)
registerAllModules();

interface TableBaseProps {
  title: string;
  sheetName: string;
  data: any[][];
  setData: (data: any[][]) => void;
}

const TableBase: React.FC<TableBaseProps> = ({ title, sheetName, data, setData }) => {
  const hotRef = useRef<HotTableClass>(null);
  const [fileName, setFileName] = useState<string>("");
  const [toast, setToast] = useState<string>("");

  // ===== mini-toast =====
  const showToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(""), 2000);
  };

  // ===== helpers =====
  const getHot = (): Handsontable | undefined => {
    // hotInstance типизируем как Handsontable
    return hotRef.current?.hotInstance as unknown as Handsontable | undefined;
  };

  const getCopyPastePlugin = (): CopyPastePlugin | null => {
    const hot = getHot();
    if (!hot) return null;
    // Явное приведение типов к плагину CopyPaste
    const plugin = hot.getPlugin("CopyPaste") as unknown as CopyPastePlugin | undefined;
    return plugin ?? null;
  };

  const getSelectedRect = (hot: Handsontable) => {
    const sel = hot.getSelected();
    if (!sel) return null;
    const [r0, c0, r1, c1] = sel[0];
    const r1n = Math.min(r0, r1);
    const r2n = Math.max(r0, r1);
    const c1n = Math.min(c0, c1);
    const c2n = Math.max(c0, c1);
    return { r1: r1n, r2: r2n, c1: c1n, c2: c2n };
  };

  const buildTSVFromSelection = (hot: Handsontable) => {
    const rect = getSelectedRect(hot);
    if (!rect) return "";
    const { r1, r2, c1, c2 } = rect;
    const out: string[][] = [];
    for (let r = r1; r <= r2; r++) {
      const row: string[] = [];
      for (let c = c1; c <= c2; c++) {
        row.push((hot.getDataAtCell(r, c) as string) ?? "");
      }
      out.push(row);
    }
    return out.map((row) => row.join("\t")).join("\n");
  };

  const expandDataForPaste = (base: any[][], rowStart: number, colStart: number, rows: string[][]) => {
    const neededRows = rowStart + rows.length;
    const neededCols = colStart + Math.max(0, ...rows.map((r) => r.length));
    const newData = base.map((r) => [...r]);

    const currentCols = Math.max(neededCols, Math.max(0, ...newData.map((r) => r.length)));
    // дополняем существующие строки до нужного количества столбцов
    for (let i = 0; i < newData.length; i++) {
      if (newData[i].length < currentCols) {
        newData[i] = [...newData[i], ...Array(currentCols - newData[i].length).fill("")];
      }
    }
    // добавляем недостающие строки
    while (newData.length < neededRows) {
      newData.push(Array(currentCols).fill(""));
    }
    return newData;
  };

  // ===== File: load/export =====
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setFileName(file.name);
    const reader = new FileReader();
    reader.onload = (event) => {
      const arrayBuffer = event.target?.result;
      if (!arrayBuffer) return;

      const workbook = XLSX.read(arrayBuffer, { type: "array" });
      const firstSheet = workbook.SheetNames[0];
      const sheet = workbook.Sheets[firstSheet];
      const sheetData = XLSX.utils.sheet_to_json(sheet, { header: 1 }) as any[][];

      const maxCols = Math.max(0, ...sheetData.map((row) => row.length));
      const normalized = sheetData.map((row) =>
        Array.from({ length: maxCols }, (_, i) => row[i] ?? "")
      );

      setData(normalized);
      showToast("Файл загружен");
    };
    reader.readAsArrayBuffer(file);
  };

  const handleDownload = () => {
    const worksheet = XLSX.utils.aoa_to_sheet(data);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, sheetName);
    XLSX.writeFile(workbook, `${sheetName}.xlsx`);
    showToast("Файл экспортирован");
  };

  // ===== Rows add/remove =====
  const addRow = () => {
    setData([...data, Array(data[0]?.length || 1).fill("")]);
    showToast("Строка добавлена");
  };

  const removeRow = () => {
    if (data.length > 1) {
      setData(data.slice(0, -1));
      showToast("Строка удалена");
    }
  };

  // ===== Copy / Cut / Paste =====
  const handleCopy = async () => {
    const cp = getCopyPastePlugin();
    const hot = getHot();
    if (cp && hot) {
      cp.copy();
      showToast("Скопировано");
      return;
    }

    // fallback: вручную в буфер
    if (hot) {
      const text = buildTSVFromSelection(hot);
      if (text) {
        try {
          await navigator.clipboard.writeText(text);
          showToast("Скопировано");
        } catch {
          showToast("Не удалось скопировать");
        }
      }
    }
  };

  const handleCut = async () => {
    const cp = getCopyPastePlugin();
    const hot = getHot();
    if (cp && hot) {
      cp.cut();
      showToast("Вырезано");
      return;
    }

    // fallback: копируем и чистим вручную
    if (hot) {
      const rect = getSelectedRect(hot);
      const text = buildTSVFromSelection(hot);
      try {
        if (text) await navigator.clipboard.writeText(text);
      } catch {
        /* ignore */
      }
      if (rect) {
        const { r1, r2, c1, c2 } = rect;
        const newData = data.map((r) => [...r]);
        for (let r = r1; r <= r2; r++) {
          for (let c = c1; c <= c2; c++) {
            if (!newData[r]) newData[r] = [];
            newData[r][c] = "";
          }
        }
        setData(newData);
      }
      showToast("Вырезано");
    }
  };

  const handlePaste = async () => {
    const cp = getCopyPastePlugin();
    const hot = getHot();
    if (!hot) return;

    try {
      const text = await navigator.clipboard.readText();
      if (cp && typeof (cp as any).paste === "function") {
        cp.paste(text);
        showToast("Вставлено");
        return;
      }

      // fallback: вставляем вручную
      const rows = text
        .replace(/\r\n/g, "\n")
        .replace(/\r/g, "\n")
        .split("\n")
        .map((line) => line.split("\t"));

      const sel = hot.getSelected();
      if (!sel) return;
      const [rowStart, colStart] = sel[0];

      let newData = expandDataForPaste(data, rowStart, colStart, rows);

      rows.forEach((row, rIdx) => {
        row.forEach((val, cIdx) => {
          const rr = rowStart + rIdx;
          const cc = colStart + cIdx;
          if (!newData[rr]) newData[rr] = [];
          newData[rr][cc] = val;
        });
      });

      setData(newData);
      showToast("Вставлено");
    } catch (e) {
      console.error("Ошибка чтения буфера обмена:", e);
      showToast("Не удалось вставить");
    }
  };

  return (
    <div>
      <h3 style={{ marginBottom: 10 }}>{title}</h3>

      <HotTable
        ref={hotRef}
        data={data}
        colHeaders={true}
        rowHeaders={true}
        width="100%"
        height="400px"
        stretchH="all"
        autoColumnSize={true}
        licenseKey="non-commercial-and-evaluation"
        copyPaste={true} // ✨ включает встроенные Ctrl/Cmd + C / V / X
        afterChange={(changes, source) => {
          if (source !== "loadData" && changes) {
            setData([...data]);
          }
        }}
      />

      {/* Панель управления */}
      <div style={{ marginTop: 15, display: "flex", gap: 10, alignItems: "center", flexWrap: "wrap" }}>
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

        <button onClick={handleCopy}>Скопировать</button>
        <button onClick={handleCut}>Вырезать</button>
        <button onClick={handlePaste}>Вставить</button>
      </div>

      {/* mini-toast */}
      {toast && (
        <div
          style={{
            position: "fixed",
            bottom: 20,
            right: 20,
            background: "#333",
            color: "#fff",
            padding: "10px 15px",
            borderRadius: 8,
            fontSize: 14,
            boxShadow: "0 2px 6px rgba(0,0,0,0.3)",
            opacity: 0.95,
            zIndex: 9999,
          }}
        >
          {toast}
        </div>
      )}
    </div>
  );
};

export default TableBase;

