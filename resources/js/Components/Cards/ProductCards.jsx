import { Link } from "@inertiajs/react";
import React from "react";
import styles from "./ProductCards.module.css";

export default function ProductCards({
    id,
    image,
    name,
    price,
    promotion,
    final_price,
}) {
    return (
        <Link href={route("products.show", id)} className={styles.card}>
            <div className={styles.cardImageWrap}>
                <img src={image || "/storage/offer/templateP.png"} alt={name} />
            </div>
            <div className={styles.cardFooter}>
                <h5 className={styles.cardTitle}>{name}</h5>
                {promotion ? (
                    <div className={styles.priceRow}>
                        <span className={styles.oldPrice}>
                            ${Number(price).toFixed(2)}
                        </span>
                        <span className={styles.percent}>(-{promotion}%)</span>
                        <span className={styles.newPrice}>
                            ${Number(final_price).toFixed(2)}
                        </span>
                    </div>
                ) : (
                    <div className={styles.cardPrice}>
                        ${Number(price).toFixed(2)}
                    </div>
                )}
            </div>
        </Link>
    );
}
