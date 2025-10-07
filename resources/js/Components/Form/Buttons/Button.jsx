import styles from "./Button.module.css";

export default function Button({
    children,
    onClick,
    type = "button",
    disabled,
}) {
    return (
        <button
            type={type}
            className={`${styles.button} ${disabled ? styles.disabled : ""}`}
            onClick={onClick}
            disabled={disabled}
        >
            {children}
        </button>
    );
}
