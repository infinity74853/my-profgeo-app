import { ReactNode } from "react";
import styles from "./AuthLayout.module.css";

interface Props {
  title: string;
  children: ReactNode;
}

const AuthLayout = ({ title, children }: Props) => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.card}>
        <h2 className={styles.title}>{title}</h2>
        {children}
      </div>
    </div>
  );
};

export default AuthLayout;
