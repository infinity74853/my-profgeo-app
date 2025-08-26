import styles from "./ToggleGroup.module.css";

interface Option {
  label: string;
  value: string;
}

interface Props {
  value: string;
  onChange: (value: string) => void;
  options: Option[];
}

export const ToggleGroup = ({ value, onChange, options }: Props) => {
  return (
    <div className={styles.group}>
      {options.map((opt) => (
        <button
          key={opt.value}
          type="button"
          className={`${styles.button} ${value === opt.value ? styles.active : ""}`}
          onClick={() => onChange(opt.value)}
        >
          {opt.label}
        </button>
      ))}
    </div>
  );
};
