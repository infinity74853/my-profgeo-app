import styles from './Button.module.css';

import { ButtonHTMLAttributes } from "react";

type Props = ButtonHTMLAttributes<HTMLButtonElement>;

export const Button = ({ children, ...props }: Props) => {
  return (
    <button className={styles.button} {...props}>
      {children}
    </button>
  );
};