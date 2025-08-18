// src/pages/Work/modules/excel/ModuleExcelEditor.tsx
import React, { useState, useEffect } from "react";
import * as XLSX from "xlsx";
import "handsontable/dist/handsontable.full.min.css";

// Импорт таблиц
import TableMain from "./tables/TableMain";
import TableCatalogWells from "./tables/TableCatalogWells";
import TableCatalogThermoWells from "./tables/TableCatalogThermoWells";
import TableVEZ from "./tables/TableVEZ";
import TableBT from "./tables/TableBT";
import TableLithology from "./tables/TableLithology";
import TableThermo from "./tables/TableThermo";
import TableVEZData from "./tables/TableVEZData";
import TableBTData from "./tables/TableBTData";
import TableRegional from "./tables/TableRegional";
import TableIGE from "./tables/TableIGE";
import TableConclusions from "./tables/TableConclusions";

const STORAGE_KEY = "my-profgeo-tables";

const tableNames = [
  "Основное",
  "Каталог скважин",
  "Каталог скважин для термометрии",
  "Каталог ВЭЗ",
  "Каталог БТ",
  "Литологический разрез",
  "Данные термометрии",
  "Данные ВЭЗ",
  "Данные БТ",
  "Региональные данные",
  "Перечень ИГЭ",
  "Выводы",
];

const defaultData: any[][][] = [
  [["ID", "Название", "Описание"], [1, "Проект А", "Основные данные"]],
  [["ID", "Скважина", "Глубина"]],
  [["ID", "Скважина термо", "Глубина"]],
  [["ID", "ВЭЗ"]],
  [["ID", "БТ"]],
  [["ID", "Литология"]],
  [["ID", "Температура"]],
  [["ID", "Данные ВЭЗ"]],
  [["ID", "Данные БТ"]],
  [["ID", "Регион"]],
  [["ID", "ИГЭ"]],
  [["Выводы"]],
];

const ModuleExcelEditor: React.FC = () => {
  const [activeTable, setActiveTable] = useState(0);
  const [tablesData, setTablesData] = useState<any[][][]>(defaultData);

  // Загружаем данные из localStorage при старте
  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) {
          setTablesData(parsed);
        }
      } catch (e) {
        console.error("Ошибка загрузки данных из localStorage:", e);
      }
    }
  }, []);

  // Сохраняем в localStorage при каждом изменении
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(tablesData));
  }, [tablesData]);

  const setTableData = (index: number, newData: any[][]) => {
    setTablesData((prev) => {
      const updated = [...prev];
      updated[index] = newData;
      return updated;
    });
  };

  // функция экспорта всех таблиц в один Excel
  const handleExportAll = () => {
    const workbook = XLSX.utils.book_new();

    tablesData.forEach((data, i) => {
      const worksheet = XLSX.utils.aoa_to_sheet(data);
      XLSX.utils.book_append_sheet(workbook, worksheet, tableNames[i]);
    });

    XLSX.writeFile(workbook, "all_tables.xlsx");
  };

  // сброс всех данных
  const handleReset = () => {
    if (window.confirm("Вы уверены, что хотите очистить все таблицы?")) {
      setTablesData(defaultData);
      localStorage.removeItem(STORAGE_KEY);
    }
  };

  const renderActiveTable = () => {
    const props = {
      data: tablesData[activeTable],
      setData: (newData: any[][]) => setTableData(activeTable, newData),
    };

    switch (activeTable) {
      case 0: return <TableMain {...props} />;
      case 1: return <TableCatalogWells {...props} />;
      case 2: return <TableCatalogThermoWells {...props} />;
      case 3: return <TableVEZ {...props} />;
      case 4: return <TableBT {...props} />;
      case 5: return <TableLithology {...props} />;
      case 6: return <TableThermo {...props} />;
      case 7: return <TableVEZData {...props} />;
      case 8: return <TableBTData {...props} />;
      case 9: return <TableRegional {...props} />;
      case 10: return <TableIGE {...props} />;
      case 11: return <TableConclusions {...props} />;
      default: return <TableMain {...props} />;
    }
  };

  return (
    <div style={{ padding: 20 }}>
      {/* 🔘 Кнопки выбора таблиц */}
      <div style={{ display: "flex", overflowX: "auto", marginBottom: 15, gap: "10px" }}>
        {tableNames.map((name, index) => (
          <button
            key={index}
            onClick={() => setActiveTable(index)}
            style={{
              padding: "8px 12px",
              background: activeTable === index ? "#1976d2" : "#eee",
              color: activeTable === index ? "#fff" : "#000",
              borderRadius: 6,
              cursor: "pointer",
            }}
          >
            {name}
          </button>
        ))}
      </div>

      {/* 📝 Активная таблица */}
      {renderActiveTable()}

      {/* 📤 Управление */}
      <div style={{ marginTop: 20, display: "flex", gap: 10 }}>
        <button onClick={handleExportAll}>Экспортировать все таблицы</button>
        <button onClick={handleReset} style={{ background: "#e53935", color: "#fff" }}>
          Сбросить все данные
        </button>
      </div>
    </div>
  );
};

export default ModuleExcelEditor;

