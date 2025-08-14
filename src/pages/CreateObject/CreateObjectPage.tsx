import ObjectForm from '@/widgets/ObjectForm/ObjectForm';
import ObjectsTable from '@/widgets/ObjectsTable/ObjectsTable';
import styles from './CreateObjectPage.module.css';
import { saveObjectWithItems } from '@/shared/api/objectApi';
import { useState } from 'react';

const CreateObjectPage = () => {
  const [pending, setPending] = useState(false);
  const [tableSnapshot, setTableSnapshot] = useState<{rows:any[]}>({ rows: [] });

  const handleSave = async (formData: any) => {
    setPending(true);
    try {
      await saveObjectWithItems({
        object: formData,
        items: tableSnapshot.rows,
      });
      alert('Сохранено');
    } catch (e) {
      console.error(e);
      alert('Ошибка сохранения');
    } finally {
      setPending(false);
    }
  };

  return (
    <>
      <h2 className={styles.title}>Создание объекта</h2>

      {/* Форма отдаёт onSubmit наверх */}
      <ObjectForm onSubmit={handleSave} />

      <div className={styles.sectionTitle}>Перечень проектируемых сооружений</div>

      <ObjectsTable
        onSnapshot={setTableSnapshot}
      />

      <div className={styles.footer}>
        <button
          className={styles.saveBtn}
          form="object-form"
          type="submit"
          disabled={pending}
          title="Сохраняется..."
        >
          Сохранить
        </button>
      </div>
    </>
  );
};

export default CreateObjectPage;
