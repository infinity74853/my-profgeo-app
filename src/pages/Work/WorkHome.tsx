import { useState } from "react";
import ModuleXLSX from "./modules/ModuleXLSX";
import ModuleExcelJS from "./modules/ModuleExcelJS";
import ModuleExcelRenderer from "./modules/ModuleExcelRenderer";

const WorkHome: React.FC = () => {
  const [activeModule, setActiveModule] = useState<number | null>(null);

  return (
    <div style={{ padding: 20 }}>
      <div style={{ display: "flex", gap: 10, marginBottom: 20 }}>
        <button onClick={() => setActiveModule(1)}>Кнопка 1</button>
        <button onClick={() => setActiveModule(2)}>Кнопка 2</button>
        <button onClick={() => setActiveModule(3)}>Кнопка 3</button>
      </div>

      <div style={{ border: "1px solid #ccc", padding: 20, borderRadius: 12 }}>
        {activeModule === 1 && <ModuleXLSX />}
        {activeModule === 2 && <ModuleExcelJS />}
        {activeModule === 3 && <ModuleExcelRenderer />}
        {!activeModule && <p>Выберите модуль, чтобы начать работу</p>}
      </div>
    </div>
  );
};

export default WorkHome;

