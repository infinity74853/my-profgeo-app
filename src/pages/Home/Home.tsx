import { useAppSelector, useAppDispatch } from '@/app/hooks';
import { ObjectForm } from '@/widgets/ObjectForm/ObjectForm';
import { showCreateForm } from '@/features/object-management/slices/objectFormSlice';
import styles from './Home.module.css';

const Home = () => {
  const dispatch = useAppDispatch();
  const { showObjectForm } = useAppSelector(state => state.objectForm);

  const handleCreateClick = () => {
    dispatch(showCreateForm());
  };

  return (
    <>
      {showObjectForm ? (
        <ObjectForm onSubmit={function (data: { name: string; code: string; contractNumber: string; contractDate: string; designation: string; customer: string; contractor: string; }): void {
          throw new Error('Function not implemented.');
        } } />
      ) : (
        <>
          <div className={styles.content__header}>
            <h2 className={styles.content__title}>Объекты</h2>
            <button 
              className={styles.content__createButton}
              onClick={handleCreateClick}
            >
              <div className={styles.content__createIcon} />
              <span>Создать объект</span>
            </button>
          </div>
          <div className={styles.content__empty}>
            <p className={styles.content__emptyTitle}>Пока пусто</p>
            <p className={styles.content__emptyText}>Ваши объекты будут здесь</p>
          </div>
        </>
      )}
    </>
  );
};

export default Home;