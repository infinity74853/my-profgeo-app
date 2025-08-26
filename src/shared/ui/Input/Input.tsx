import { InputHTMLAttributes } from "react";
import styles from "./Input.module.css";

type Props = InputHTMLAttributes<HTMLInputElement>;

export const Input = (props: Props) => {
  return <input className={styles.input} {...props} />;
};