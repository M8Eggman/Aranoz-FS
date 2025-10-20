import styles from "./Button.module.css";

export default function Button({
    children,
    onClick,
    className = "",
    type = "button",
    disabled,
}) {
    return (
        <button
            type={type}
            className={`${styles.button} ${disabled ? styles.disabled : ""} ${className}`}
            onClick={onClick}
            disabled={disabled}
        >
            {children}
        </button>
    );
}
