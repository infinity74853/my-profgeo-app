import styles from "./Checkbox.module.css";

interface Props {
  checked: boolean;
  onCheckedChange: (value: boolean) => void;
}

export const Checkbox = ({ checked, onCheckedChange }: Props) => {
  return (
    <label className={styles.wrapper}>
      <input
        type="checkbox"
        checked={checked}
        onChange={(e) => onCheckedChange(e.target.checked)}
      />
      <span className={styles.checkmark}></span>
    </label>
  );
};