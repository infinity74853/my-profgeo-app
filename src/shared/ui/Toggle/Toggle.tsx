import styles from "./Toggle.module.css";

interface Props {
  checked: boolean;
  onChange: (value: boolean) => void;
}

export const Toggle = ({ checked, onChange }: Props) => {
  return (
    <label className={styles.switch}>
      <input
        type="checkbox"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
      />
      <span className={styles.slider}></span>
    </label>
  );
};