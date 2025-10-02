import React from "react";
import styles from "./AdminButton.module.css";

export default function AdminButton({
    children,
    onClick,
    type = "button",
    variant = "",
}) {
    // Choisi la bonne variante du bouton
    const variantClass =
        variant === "cancel"
            ? styles.buttonCancel
            : variant === "delete"
            ? styles.buttonDelete
            : variant === "edit"
            ? styles.buttonEdit
            : "";

    return (
        <button
            type={type}
            onClick={onClick}
            className={`${styles.button} ${variantClass}`}
        >
            {children}
        </button>
    );
}
