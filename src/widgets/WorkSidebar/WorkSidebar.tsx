import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logout } from "@/features/auth/model/authSlice";
import styles from "./WorkSidebar.module.css";

const WorkSidebar: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    navigate("/");
  };

  return (
    <aside className={styles.sidebar}>
      <div className={styles.sidebar__menuContainer}>
        <NavLink
          to="/work/app1"
          className={({ isActive }) =>
            `${styles.sidebar__menuItem} ${isActive ? styles.active : ""}`
          }
          >
            <div className={`${styles.sidebar__icon} ${styles.sidebar__iconList}`} />
              <span>Модуль1 - ModuleExcelEditor</span>
        </NavLink>          
      </div>

      <div className={styles.sidebar__footer}>
        <button
          type="button"
          className={styles.sidebar__logout}
          onClick={handleLogout}
        >
          {/* ← это и есть контейнер под иконку */}
          <div className={`${styles.sidebar__icon} ${styles.sidebar__iconLogout}`} />
          <span>Выйти</span>
        </button>
      </div>
    </aside>
  );
};

export default WorkSidebar;






