import React from "react";
import styles from "./QuantitySelector.module.css";

export default function QuantitySelector({ 
    value, 
    onChange, 
    min = 1, 
    max = 99, 
    disabled = false 
}) {
    const handleDecrease = () => {
        if (value > min && !disabled) {
            onChange(value - 1);
        }
    };

    const handleIncrease = () => {
        if (value < max && !disabled) {
            onChange(value + 1);
        }
    };

    const handleInputChange = (e) => {
        const newValue = parseInt(e.target.value) || min;
        if (newValue >= min && newValue <= max) {
            onChange(newValue);
        }
    };

    return (
        <div className={styles.quantitySelector}>
            <button
                type="button"
                className={`${styles.quantityButton} ${styles.decrease}`}
                onClick={handleDecrease}
                disabled={disabled || value <= min}
                aria-label="Decrease quantity"
            >
                -
            </button>
            <input
                type="number"
                className={styles.quantityInput}
                value={value}
                onChange={handleInputChange}
                min={min}
                max={max}
                disabled={disabled}
                aria-label="Quantity"
            />
            <button
                type="button"
                className={`${styles.quantityButton} ${styles.increase}`}
                onClick={handleIncrease}
                disabled={disabled || value >= max}
                aria-label="Increase quantity"
            >
                +
            </button>
        </div>
    );
}
