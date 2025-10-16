import React from "react";
import styles from "./TextArea.module.css";

export default function TextArea({
    name,
    value,
    onChange,
    placeholder,
    rows = 3,
    className = "",
}) {
    return (
        <textarea
            name={name}
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            className={`${styles.textarea} ${className}`}
            rows={rows}
        />
    );
}
