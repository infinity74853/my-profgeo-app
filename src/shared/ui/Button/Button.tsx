import React from 'react';
import styles from './Button.module.css';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  loading?: boolean;
  children: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({ 
  loading = false, 
  children,
  ...props 
}) => {
  return (
    <button 
      className={styles.button}
      disabled={loading || props.disabled}
      {...props}
    >
      {loading ? (
        <span className={styles.spinner} aria-label="Загрузка" />
      ) : (
        children
      )}
    </button>
  );
};