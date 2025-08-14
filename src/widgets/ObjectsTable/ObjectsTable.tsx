import { useEffect, useMemo, useState } from 'react';
import styles from './ObjectsTable.module.css';
import { fetchTableItems } from '@/shared/api/objectApi';

type Row = {
  id: string;
  name: string;
  type: string;
  routeDefined: boolean;
  profileDefined: boolean;
  scaleH: string;
  scaleV: string;
};

type Props = {
  onSnapshot?: (state: { rows: Row[] }) => void;
};

const PAGE_SIZE = 10;

const ObjectsTable: React.FC<Props> = ({ onSnapshot }) => {
  const [rows, setRows] = useState<Row[]>([]);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [search, setSearch] = useState('');
  const [pending, setPending] = useState(false);

  const from = (page - 1) * PAGE_SIZE + 1;
  const to = Math.min(page * PAGE_SIZE, total);

  useEffect(() => {
    onSnapshot?.({ rows });
  }, [rows, onSnapshot]);

  const load = async () => {
    setPending(true);
    try {
      const res = await fetchTableItems({ page, limit: PAGE_SIZE, q: search });
      setRows(res.items);
      setTotal(res.total);
    } finally {
      setPending(false);
    }
  };

  useEffect(() => { load(); /* eslint-disable-next-line */}, [page, search]);

  const handleAddRow = () => {
    setRows(prev => [
      ...prev,
      {
        id: `tmp-${Date.now()}`,
        name: '',
        type: '',
        routeDefined: false,
        profileDefined: false,
        scaleH: '',
        scaleV: '',
      },
    ]);
    setTotal(t => t + 1);
  };

  const handleImport = () => {
    // здесь можно открыть диалог выбора файла и распарсить CSV/XLSX
    alert('Импорт: заглушка');
  };

  const pages = useMemo(() => Math.max(1, Math.ceil(total / PAGE_SIZE)), [total]);

  return (
    <div className={styles.wrap}>
      <div className={styles.toolbar}>
        <input
          className={styles.search}
          placeholder="Поиск"
          value={search}
          onChange={e => { setPage(1); setSearch(e.target.value); }}
        />
        <div className={styles.actions}>
          <button className={styles.secondary} onClick={handleImport}>Импорт</button>
          <button className={styles.primary} onClick={handleAddRow}>+ Добавить строку</button>
        </div>
      </div>

      <div className={styles.tableBox}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th style={{width:40}}></th>
              <th style={{width:60}}>№</th>
              <th>Наименование графического положения</th>
              <th>Тип объекта</th>
              <th>Трасса определена</th>
              <th>Профиль определен</th>
              <th colSpan={2}>Масштаб</th>
            </tr>
          </thead>
          <tbody>
            {pending ? (
              <tr><td colSpan={8} className={styles.center}>Загрузка...</td></tr>
            ) : rows.length === 0 ? (
              <tr><td colSpan={8} className={styles.center}>Пока пусто</td></tr>
            ) : (
              rows.map((r, idx) => (
                <tr key={r.id}>
                  <td><input type="checkbox" /></td>
                  <td>{(page - 1) * PAGE_SIZE + idx + 1}</td>
                  <td>{r.name}</td>
                  <td>{r.type}</td>
                  <td>{r.routeDefined ? 'Да' : 'Нет'}</td>
                  <td>{r.profileDefined ? 'Да' : 'Нет'}</td>
                  <td>{r.scaleH}</td>
                  <td>{r.scaleV}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <div className={styles.footer}>
        <span>{from}–{to} из {total}</span>
        <div className={styles.pager}>
          <button disabled={page<=1} onClick={()=>setPage(p=>p-1)}>Назад</button>
          <span>{page}/{pages}</span>
          <button disabled={page>=pages} onClick={()=>setPage(p=>p+1)}>Вперёд</button>
        </div>
      </div>
    </div>
  );
};

export default ObjectsTable;
export { ObjectsTable };
