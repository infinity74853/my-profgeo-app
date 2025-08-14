import { Outlet } from 'react-router-dom';
import Sidebar from '@widgets/Sidebar/Sidebar';
import styles from './HomeLayout.module.css';

const HomeLayout: React.FC = () => {
  return (
    <div className={styles.mainContent}>
      <Sidebar />
      <section className={styles.content}>
        <Outlet />
      </section>
    </div>
  );
};

export default HomeLayout;
