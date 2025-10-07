import React from "react";
import styles from "./TextInput.module.css";

export default function TextInput({
    type = "text",
    name,
    value,
    onChange,
    onKeyDown,
    placeholder,
    className,
}) {
    return (
        <input
            type={type}
            name={name}
            value={value}
            onChange={onChange}
            onKeyDown={onKeyDown}
            placeholder={placeholder}
            className={`${styles.input} ${className || ""}`}
        />
    );
}
