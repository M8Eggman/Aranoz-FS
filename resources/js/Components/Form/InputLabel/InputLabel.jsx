import styles from "./InputLabel.module.css";

export default function InputLabel({
    value,
    className = "",
    children,
    ...props
}) {
    return (
        <label {...props} className={`${styles.label} ${className}`}>
            {value ? value : children}
        </label>
    );
}
