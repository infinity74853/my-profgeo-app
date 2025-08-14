import { importTableDataFx } from 'features/object-management/model/store';

export const ImportButton = () => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) {
      const formData = new FormData();
      formData.append('file', e.target.files[0]);
      importTableDataFx(formData);
    }
  };

  return (
    <label className="import-button">
      <input type="file" onChange={handleChange} accept=".csv,.xlsx" hidden />
      Импорт
    </label>
  );
};