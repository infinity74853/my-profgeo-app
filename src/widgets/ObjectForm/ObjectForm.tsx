import React, { useRef, useState } from 'react';
import { useAppDispatch } from '@/app/hooks';
import { hideCreateForm } from '@/features/object-management/slices/objectFormSlice';
import { toast } from 'react-toastify';
import styles from './ObjectForm.module.css';

interface TableRow {
  id: number;
  name: string;
  type: string;
  profileDefined: string;
  scaleHorizontal: string;
  scaleVertical: string;
}

export interface FormValues {
  name: string;
  code: string;
  contractNumber?: string;
  contractDate?: string;
  designation?: string;
  customer?: string;
  contractor?: string;
  tableRows?: TableRow[];
}

interface ObjectFormProps {
  onSubmit: (data: FormValues) => void;
}

const ObjectForm: React.FC<ObjectFormProps> = ({ onSubmit }) => {
  const dispatch = useAppDispatch();
  const [rows, setRows] = useState<TableRow[]>([]);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const nextIdRef = useRef<number>(1);

  const newId = () => nextIdRef.current++;

  const handleBack = () => {
    dispatch(hideCreateForm());
  };

  const handleAddRow = () => {
    setRows((prev) => [
      ...prev,
      {
        id: newId(),
        name: '',
        type: '',
        profileDefined: '',
        scaleHorizontal: '',
        scaleVertical: '',
      },
    ]);
  };

  const handleRowChange = (id: number, field: keyof TableRow, value: string) => {
    setRows((prev) => prev.map((r) => (r.id === id ? { ...r, [field]: value } : r)));
  };

  const handleDeleteRow = (id: number) => {
    setRows((prev) => prev.filter((r) => r.id !== id));
  };

  const handleImportClick = () => {
    fileInputRef.current?.click();
  };

  const parseCSVText = (text: string): TableRow[] => {
    const lines = text.split(/\r?\n/).map((l) => l.trim()).filter(Boolean);
    if (!lines.length) return [];

    // угадываем разделитель: ; | \t | ,
    const first = lines[0];
    const delim = first.includes(';')
      ? ';'
      : first.includes('\t')
      ? '\t'
      : ',';

    const rowsArr = lines.map((l) => l.split(delim).map((c) => c.trim()));
    // Если в первой строке похоже на заголовки — пропускаем её
    const looksLikeHeader = (arr: string[]) =>
      arr.some((h) =>
        /наимен|тип|профил|масшт|name|type|profile|scale/i.test(h)
      );

    const start = looksLikeHeader(rowsArr[0]) ? 1 : 0;

    const toRow = (arr: string[]): TableRow => {
      let a = [...arr];
      // если первый столбец — №
      if (a.length >= 6 && /^\d+$/.test(a[0])) a = a.slice(1);

      const [name = '', type = '', profileDefined = '', scaleHorizontal = '', scaleVertical = ''] = a;
      return {
        id: newId(),
        name,
        type,
        profileDefined,
        scaleHorizontal,
        scaleVertical,
      };
    };

    return rowsArr.slice(start).map(toRow).filter((r) => Object.values(r).some(Boolean));
  };

  const handleFileChange: React.ChangeEventHandler<HTMLInputElement> = async (e) => {
    const file = e.target.files?.[0];
    // чтобы можно было импортировать один и тот же файл повторно
    if (fileInputRef.current) fileInputRef.current.value = '';

    if (!file) return;

    const ext = file.name.split('.').pop()?.toLowerCase();

    try {
      if (ext === 'csv' || ext === 'txt') {
        const text = await file.text();
        const parsed = parseCSVText(text);
        if (!parsed.length) {
          toast.info('Файл прочитан, но данных не найдено');
          return;
        }
        setRows((prev) => [...prev, ...parsed]);
        toast.success(`Импортировано строк: ${parsed.length}`);
        return;
      }

      if (ext === 'json') {
        const text = await file.text();
        const data = JSON.parse(text) as Array<
          Partial<Pick<TableRow, 'name' | 'type' | 'profileDefined' | 'scaleHorizontal' | 'scaleVertical'>>
        >;
        const prepared = (data || []).map((d) => ({
          id: newId(),
          name: d.name ?? '',
          type: d.type ?? '',
          profileDefined: d.profileDefined ?? '',
          scaleHorizontal: d.scaleHorizontal ?? '',
          scaleVertical: d.scaleVertical ?? '',
        }));
        if (!prepared.length) {
          toast.info('JSON прочитан, но данных не найдено');
          return;
        }
        setRows((prev) => [...prev, ...prepared]);
        toast.success(`Импортировано строк: ${prepared.length}`);
        return;
      }

      // XLSX / XLS — через динамический импорт, чтобы проект не падал, если пакет не установлен
      if (ext === 'xlsx' || ext === 'xls') {
        try {
          const XLSX = await import('xlsx'); // нужен пакет xlsx
          const buf = await file.arrayBuffer();
          const wb = XLSX.read(buf, { type: 'array' });
          const ws = wb.Sheets[wb.SheetNames[0]];
          const sheet: any[][] = XLSX.utils.sheet_to_json(ws, { header: 1 });

          if (!sheet || !sheet.length) {
            toast.info('Лист Excel пуст');
            return;
          }

          const looksLikeHeader = (arr: any[]) =>
            arr.some((h) => typeof h === 'string' && /наимен|тип|профил|масшт|name|type|profile|scale/i.test(h));

          const start = looksLikeHeader(sheet[0]) ? 1 : 0;

          const prepared: TableRow[] = sheet
            .slice(start)
            .map((arr) => (Array.isArray(arr) ? arr : []))
            .map((arr) => {
              let a = [...arr];
              if (a.length >= 6 && typeof a[0] === 'number') a = a.slice(1);
              const [name = '', type = '', profileDefined = '', scaleHorizontal = '', scaleVertical = ''] = a;
              return {
                id: newId(),
                name: String(name ?? ''),
                type: String(type ?? ''),
                profileDefined: String(profileDefined ?? ''),
                scaleHorizontal: String(scaleHorizontal ?? ''),
                scaleVertical: String(scaleVertical ?? ''),
              };
            })
            .filter((r) => Object.values(r).some(Boolean));

          if (!prepared.length) {
            toast.info('Excel прочитан, но данных не найдено');
            return;
          }

          setRows((prev) => [...prev, ...prepared]);
          toast.success(`Импортировано строк: ${prepared.length}`);
          return;
        } catch (err) {
          // пакет xlsx отсутствует
          toast.error('Для импорта .xlsx установите пакет: npm i xlsx @types/xlsx');
          return;
        }
      }

      toast.error('Поддерживаются форматы: .csv, .json, .xlsx, .xls');
    } catch (err) {
      console.error(err);
      toast.error('Не удалось импортировать файл');
    }
  };

  return (
    <div className={styles.wrapper}>
      {/* Заголовок */}
      <div className={styles.header}>
        <button className={styles.backButton} onClick={handleBack} />
        <h1 className={styles.title}>Создание объекта</h1>
      </div>

      {/* Форма */}
      <form
        className={styles.form}
        onSubmit={(e) => {
          e.preventDefault();
          const formData = new FormData(e.currentTarget);
          const values: FormValues = {
            name: (formData.get('name') as string) || '',
            code: (formData.get('code') as string) || '',
            contractNumber: (formData.get('contractNumber') as string) || undefined,
            contractDate: (formData.get('contractDate') as string) || undefined,
            designation: (formData.get('designation') as string) || undefined,
            customer: (formData.get('customer') as string) || undefined,
            contractor: (formData.get('contractor') as string) || undefined,
            tableRows: rows,
          };
          onSubmit(values);
        }}
      >
        <div className={styles.inputs}>
          <label>
            Наименование объекта
            <input name="name" placeholder="Введите наименование" required />
          </label>
          <label>
            Код объекта
            <input name="code" placeholder="Введите код" required />
          </label>
          <label>
            Номер контракта
            <input name="contractNumber" placeholder="Введите номер" />
          </label>
          <label>
            Дата контракта
            <input name="contractDate" type="date" />
          </label>
          <label>
            Назначение
            <input name="designation" placeholder="Введите назначение" />
          </label>
          <label>
            Заказчик
            <input name="customer" placeholder="Введите заказчика" />
          </label>
          <label>
            Подрядчик
            <input name="contractor" placeholder="Введите подрядчика" />
          </label>
        </div>

        <h2 className={styles.subTitle}>Перечень графических приложений</h2>

        {/* Панель поиска */}
        <div className={styles.searchPanel}>
          <input type="text" placeholder="Поиск..." className={styles.searchInput} />
          <div className={styles.actions}>
            <button type="button" className={styles.importBtn} onClick={handleImportClick}>
              Импорт
            </button>
            <button type="button" className={styles.addRowBtn} onClick={handleAddRow}>
              + Добавить строку
            </button>
          </div>
        </div>

        {/* скрытый input для файлов */}
        <input
          ref={fileInputRef}
          type="file"
          accept=".csv,.json,.xlsx,.xls,.txt"
          style={{ display: 'none' }}
          onChange={handleFileChange}
        />

        {/* Таблица */}
        <div className={styles.tableWrapper}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>№</th>
                <th>Наименование графического приложения</th>
                <th>Тип объекта</th>
                <th>Профиль определен</th>
                <th>Масштаб (гор.)</th>
                <th>Масштаб (верт.)</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {rows.length === 0 ? (
                <tr>
                  <td colSpan={7} className={styles.emptyTable}>
                    Данных нет
                  </td>
                </tr>
              ) : (
                rows.map((row, index) => (
                  <tr key={row.id}>
                    <td>{index + 1}</td>
                    <td>
                      <input
                        value={row.name}
                        onChange={(e) => handleRowChange(row.id, 'name', e.target.value)}
                      />
                    </td>
                    <td>
                      <input
                        value={row.type}
                        onChange={(e) => handleRowChange(row.id, 'type', e.target.value)}
                      />
                    </td>
                    <td>
                      <input
                        value={row.profileDefined}
                        onChange={(e) => handleRowChange(row.id, 'profileDefined', e.target.value)}
                      />
                    </td>
                    <td>
                      <input
                        value={row.scaleHorizontal}
                        onChange={(e) => handleRowChange(row.id, 'scaleHorizontal', e.target.value)}
                      />
                    </td>
                    <td>
                      <input
                        value={row.scaleVertical}
                        onChange={(e) => handleRowChange(row.id, 'scaleVertical', e.target.value)}
                      />
                    </td>
                    <td>
                      <button type="button" onClick={() => handleDeleteRow(row.id)}>
                        ✕
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Кнопка сохранения */}
        <div className={styles.footer}>
          <button type="submit" className={styles.saveBtn}>
            Сохранить
          </button>
        </div>
      </form>
    </div>
  );
};

export default ObjectForm;
