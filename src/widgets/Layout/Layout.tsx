import { Outlet } from 'react-router-dom';
import Sidebar from '@/widgets/Sidebar/Sidebar';
import styles from './Layout.module.css';

export const Layout = () => {
  return (
    <div className={styles.page}>
      <div className={styles.headerBar}>
        <h1 className={styles.title}>ООО "Первый"</h1>
      </div>

      <div className={styles.main}>
        <Sidebar />
        <section className={styles.content}>
          <Outlet />
        </section>
      </div>
    </div>
  );
};

export default Layout;
