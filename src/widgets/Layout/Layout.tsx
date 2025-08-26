import { Outlet, useLocation } from 'react-router-dom';
import Sidebar from '@/widgets/Sidebar/Sidebar';
import styles from './Layout.module.css';

export const Layout = () => {
  const location = useLocation();

  // для страниц /login и /register скрываем шапку и сайдбар
  const isAuthPage = ["/login", "/register"].includes(location.pathname);

  return (
    <div className={styles.page}>
      {!isAuthPage && (
        <div className={styles.headerBar}>
          <h1 className={styles.title}>ООО "Первый"</h1>
        </div>
      )}

      <div className={styles.main}>
        {!isAuthPage && <Sidebar />}
        <section className={styles.content}>
          <Outlet />
        </section>
      </div>
    </div>
  );
};

export default Layout;



