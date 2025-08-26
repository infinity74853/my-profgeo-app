import { LabelHTMLAttributes } from "react";
import styles from "./Label.module.css";

type Props = LabelHTMLAttributes<HTMLLabelElement>;

export const Label = ({ children, ...props }: Props) => {
  return (
    <label className={styles.label} {...props}>
      {children}
    </label>
  );
};