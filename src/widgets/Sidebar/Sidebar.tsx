import { NavLink } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logout } from "@features/auth/authSlice";
import styles from "./Sidebar.module.css";

const Sidebar: React.FC = () => {
  const dispatch = useDispatch();

  return (
    <aside className={styles.sidebar}>
      <div className={styles.sidebar__menuContainer}>
        <ul className={styles.sidebar__menu}>
          <li>
            <NavLink to="/" className={({ isActive }) => `${styles.sidebar__menuItem} ${isActive ? styles.active : ""}`}>
              <div className={`${styles.sidebar__icon} ${styles.sidebar__iconList}`} />
              <span>Объекты</span>
            </NavLink>
          </li>
          <li>
            <NavLink to="/account" className={({ isActive }) => `${styles.sidebar__menuItem} ${isActive ? styles.active : ""}`}>
              <div className={`${styles.sidebar__icon} ${styles.sidebar__iconInfo}`} />
              <span>Аккаунт</span>
            </NavLink>
          </li>
          <li>
            <NavLink to="/subscription" className={({ isActive }) => `${styles.sidebar__menuItem} ${isActive ? styles.active : ""}`}>
              <div className={`${styles.sidebar__icon} ${styles.sidebar__iconCreditCard}`} />
              <span>Подписка</span>
            </NavLink>
          </li>
          <li>
            <NavLink to="/users" className={({ isActive }) => `${styles.sidebar__menuItem} ${isActive ? styles.active : ""}`}>
              <div className={`${styles.sidebar__icon} ${styles.sidebar__iconUsers}`} />
              <span>Список пользователей</span>
            </NavLink>
          </li>
          <li>
            <NavLink to="/settings" className={({ isActive }) => `${styles.sidebar__menuItem} ${isActive ? styles.active : ""}`}>
              <div className={`${styles.sidebar__icon} ${styles.sidebar__iconSettings}`} />
              <span>Настройки</span>
            </NavLink>
          </li>
        </ul>
      </div>

      <div className={styles.sidebar__footer}>
        <button className={styles.sidebar__logout} onClick={() => dispatch(logout())}>
          <div className={`${styles.sidebar__icon} ${styles.sidebar__iconLogout}`} />
          <span>Выйти</span>
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;

