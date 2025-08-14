import { useAppSelector, useAppDispatch } from '@/app/hooks';
import ObjectForm, { FormValues } from "@widgets/ObjectForm/ObjectForm";
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
  <ObjectForm
    onSubmit={(data: FormValues) => {
      // пока просто лог
      console.log("Форма отправлена:", data);
    }}
  />
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