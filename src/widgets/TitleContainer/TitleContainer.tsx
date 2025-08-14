import styles from './TitleContainer.module.css';

const TitleContainer: React.FC = () => {
  return (
    <div className={styles['title-container']}>
      <h1 className={styles['title-container__text']}>ООО "Первый"</h1>
    </div>
  );
};

export default TitleContainer;
