import React, { useState, useRef, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@app/store";
import { logout } from "@features/auth/authSlice";
import styles from "./Header.module.css";

const Header: React.FC = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const { isAuthenticated, user } = useSelector((state: RootState) => state.auth);

  const [activeButton, setActiveButton] = useState<"lk" | "work">(
    location.pathname.startsWith("/lk") ? "lk" : "work"
  );

  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = () => {
    dispatch(logout());
    setMenuOpen(false);
  };

  return (
    <header className={styles.header}>
      <Link to="/" className={styles.header__logoContainer}>
        <div className={styles.header__logo} aria-hidden="true" />
        <span className={styles.header__logoText}>Profgeo</span>
      </Link>

      <div className={styles.header__right}>
        <div className={styles.header__navButtons}>
          {isAuthenticated ? (
            <>
              <Link
                to="/lk"
                className={`${styles.header__navButton} ${activeButton === "lk" ? styles["header__navButton--active"] : styles["header__navButton--inactive"]}`}
                onClick={() => setActiveButton("lk")}
              >
                <div className={`${styles.header__icon} ${styles.header__lkIcon}`} />
                <span>Личный кабинет</span>
              </Link>

              <Link
                to="/work"
                className={`${styles.header__navButton} ${activeButton === "work" ? styles["header__navButton--active"] : styles["header__navButton--inactive"]}`}
                onClick={() => setActiveButton("work")}
              >
                <div className={`${styles.header__icon} ${styles.header__gridIcon}`} />
                <span>Рабочий кабинет</span>
              </Link>
            </>
          ) : (
            <>
              <Link to="/login" className={`${styles.header__navButton} ${styles["header__navButton--active"]}`}>
                <span>Войти</span>
              </Link>
              <Link to="/register" className={`${styles.header__navButton} ${styles["header__navButton--active"]}`}>
                <span>Зарегистрироваться</span>
              </Link>
            </>
          )}
        </div>

        {isAuthenticated && (
          <div className={styles.header__userBlock} ref={menuRef}>
            <span className={styles.header__userName}>{user?.name || "Без имени"}</span>
            <button type="button" className={styles.header__avatar} onClick={() => setMenuOpen(!menuOpen)}>
              {user?.name
                ? user.name.split(" ").map((n) => n[0]).join("").toUpperCase()
                : "?"}
            </button>

            {/* Выпадающее меню */}
          <div
            className={`${styles.header__menu} ${
              menuOpen ? styles["header__menu--open"] : ""
            }`}
          >
            <Link to="/lk" className={styles.header__menuItem}>
              Профиль
            </Link>
                <button
                  onClick={handleLogout}
                  className={styles.header__menuItem}
                  style={{ width: "100%", textAlign: "left", background: "none", border: "none", cursor: "pointer" }}
                >
                  Выйти
                </button>
              </div>            
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
