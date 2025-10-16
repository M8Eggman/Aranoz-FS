import React, { useState } from "react";
import { usePage } from "@inertiajs/react";
import { router } from "@inertiajs/react";
import styles from "./AddToCartButton.module.css";

export default function AddToCartButton({
    productId,
    disabled = false,
    className = "",
    variant = "primary",
}) {
    const { auth } = usePage().props;
    const [isLoading, setIsLoading] = useState(false);

    const handleAddToCart = () => {
        if (disabled || isLoading) return;

        setIsLoading(true);

        router.post(
            route("cart.store"),
            {
                product_id: productId,
                quantity: 1,
            },
            {
                preserveScroll: true,
                preserveState: true,
                onSuccess: () => {
                    setIsLoading(false);
                },
                onError: () => {
                    setIsLoading(false);
                },
            }
        );
    };

    return (
        <button
            type="button"
            className={`${styles.addToCartButton} ${styles[variant]} ${className}`}
            onClick={handleAddToCart}
            disabled={disabled || isLoading}
        >
            {auth.user ? (
                isLoading ? (
                    <span className={styles.loadingText}>Adding...</span>
                ) : (
                    <span className={styles.buttonText}>ADD TO CART</span>
                )
            ) : (
                <span className={styles.buttonText}>LOGIN TO ADD TO CART</span>
            )}
        </button>
    );
}
