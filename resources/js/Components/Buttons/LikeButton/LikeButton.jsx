import React, { useState } from "react";
import { useForm, usePage } from "@inertiajs/react";
import { router } from "@inertiajs/react";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import styles from "./LikeButton.module.css";

export default function LikeButton({
    productId,
    className = "",
    size = "medium",
}) {
    const { post, processing } = useForm({
        product_id: productId,
    });

    const isLiked = usePage().props.auth?.user?.liked_products?.some(
        (product) => product.id === productId
    );

    function handleLike() {
        post(route("products.like", productId), {
            preserveScroll: true,
            preserveState: true,
        });
    }

    return (
        <button
            type="button"
            className={`${styles.likeButton} ${styles[size]} ${className}`}
            onClick={handleLike}
            disabled={processing}
        >
            {isLiked ? (
                <FaHeart className={styles.heartIcon} />
            ) : (
                <FaRegHeart className={styles.heartIcon} />
            )}
        </button>
    );
}
