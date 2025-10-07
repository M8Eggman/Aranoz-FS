import styles from "./Checkbox.module.css";

export default function Checkbox({ checked, onChange, label }) {
    return (
        <label className={styles.checkbox}>
            <input type="checkbox" checked={checked} onChange={onChange} />
            <span>{label}</span>
        </label>
    );
}
