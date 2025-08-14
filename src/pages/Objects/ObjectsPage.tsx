import { useNavigate } from 'react-router-dom';
import styles from './ObjectsPage.module.css';

const ObjectsPage = () => {
  const navigate = useNavigate();

  const handleCreateClick = () => {
    navigate('/objects/create');
  };

  return (
    <>
      <div className={styles.header}>
        <h2 className={styles.title}>Объекты</h2>
        <button className={styles.createBtn} onClick={handleCreateClick}>
          <div className={styles.createIcon} />
          <span>Создать объект</span>
        </button>
      </div>

      <div className={styles.empty}>
        <p className={styles.emptyTitle}>Пока пусто</p>
        <p className={styles.emptyText}>Ваши объекты будут здесь</p>
      </div>
    </>
  );
};

export default ObjectsPage;
