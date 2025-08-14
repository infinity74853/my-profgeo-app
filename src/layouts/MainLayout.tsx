import { Outlet } from 'react-router-dom';
import Sidebar from '@widgets/Sidebar/Sidebar';
import TitleContainer from '@widgets/TitleContainer/TitleContainer';
import styles from './MainLayout.module.css';

const MainLayout: React.FC = () => {
  return (
    <div className={styles['page-container']}>
      <TitleContainer />
      <div className={styles['main-content']}>
        <Sidebar />
        <section className={styles.content}>
          <Outlet />
        </section>
      </div>
    </div>
  );
};

export default MainLayout;
