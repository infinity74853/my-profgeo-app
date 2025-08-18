import { Outlet } from "react-router-dom";
import WorkSidebar from "@widgets/WorkSidebar/WorkSidebar";
import styles from "./WorkLayout.module.css";

const WorkLayout: React.FC = () => {
  return (
    <div className={styles.mainContent}>
      {/* Сайдбар слева */}
      <WorkSidebar />

      {/* Контент справа */}
      <section className={styles.content}>
        <Outlet />
      </section>
    </div>
  );
};

export default WorkLayout;


