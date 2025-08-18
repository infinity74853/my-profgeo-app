import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logout } from "@features/auth/authSlice";
import styles from "./WorkSidebar.module.css";

const WorkSidebar: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    navigate("/"); // уводим на главную (или на /login — как удобнее)
  };

  return (
    <aside className={styles.sidebar}>
      <div className={styles.sidebar__menuContainer}>
        <ul className={styles.sidebar__menu}>
          <li>
            <NavLink
              to="/work/app1"
              className={({ isActive }) =>
                `${styles.sidebar__menuItem} ${isActive ? styles.active : ""}`
              }
            >
              <div className={`${styles.sidebar__icon} ${styles.sidebar__iconList}`} />
              <span>Кнопка 1</span>
            </NavLink>
          </li>

          <li>
            <NavLink
              to="/work/app2"
              className={({ isActive }) =>
                `${styles.sidebar__menuItem} ${isActive ? styles.active : ""}`
              }
            >
              <div className={`${styles.sidebar__icon} ${styles.sidebar__iconList}`} />
              <span>Кнопка 2</span>
            </NavLink>
          </li>

          <li>
            <NavLink
              to="/work/app3"
              className={({ isActive }) =>
                `${styles.sidebar__menuItem} ${isActive ? styles.active : ""}`
              }
            >
              <div className={`${styles.sidebar__icon} ${styles.sidebar__iconList}`} />
              <span>Кнопка 3</span>
            </NavLink>
          </li>
        </ul>
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






