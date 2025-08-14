import React from 'react';
import styles from './Header.module.css';

const Header: React.FC = () => {
  return (
    <header className={styles.header}>
      <div className={styles.header__logoContainer}>
        <div className={styles.header__logo} aria-hidden="true" />
        <span className={styles.header__logoText}>Profgeo</span>
      </div>
      
      <div className={styles.header__actions}>
        <button 
          className={styles.header__gridButton}
          aria-label="Открыть меню"
        />
        <div className={styles.header__avatar} aria-label="Пользователь">Auth</div>
      </div>
    </header>
  );
};

export default Header;