import React from 'react';
import { useUnit } from 'effector-react';
import { 
  $objects, 
  removeObject, 
  $page, 
  setPage, 
  importTableDataFx 
} from '@features/object-management/model/store';

const ObjectsList: React.FC = () => {
  const [objects, page] = useUnit([$objects, $page]);
  const onRemove = useUnit(removeObject);
  const onSetPage = useUnit(setPage);
  const importData = useUnit(importTableDataFx);

  const pageSize = 5;
  const totalPages = Math.ceil(objects.length / pageSize);
  const paginated = objects.slice((page - 1) * pageSize, page * pageSize);

  const handleImport = () => {
    // Здесь можно заменить на чтение CSV/Excel
    const testData = [
      { id: String(Date.now()), name: 'Объект А', code: 'A-001' },
      { id: String(Date.now() + 1), name: 'Объект B', code: 'B-002' },
      { id: String(Date.now() + 2), name: 'Объект C', code: 'C-003' },
    ];
    importData(testData);
  };

  return (
    <div style={{ padding: 24 }}>
      <h2>Список объектов</h2>

      <div style={{ marginBottom: 16 }}>
        <button onClick={handleImport}>Импортировать данные</button>
      </div>

      {paginated.length === 0 ? (
        <p>Нет данных</p>
      ) : (
        <table border={1} cellPadding={8} style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              <th>Наименование</th>
              <th>Шифр</th>
              <th>Действия</th>
            </tr>
          </thead>
          <tbody>
            {paginated.map((obj) => (
              <tr key={obj.id}>
                <td>{obj.name}</td>
                <td>{obj.code}</td>
                <td>
                  <button onClick={() => onRemove(obj.id)}>Удалить</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {/* Пагинация */}
      {totalPages > 1 && (
        <div style={{ marginTop: 16 }}>
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
            <button
              key={p}
              style={{
                marginRight: 8,
                background: p === page ? '#ccc' : 'white',
              }}
              onClick={() => onSetPage(p)}
            >
              {p}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default ObjectsList;


