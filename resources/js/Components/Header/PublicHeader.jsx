import React from "react";
import styles from "./PublicHeader.module.css";

export default function PublicHeader({ title = "", subtitle = "" }) {
    return (
        <header className={styles.header}>
            <div className={styles.container}>
                <div className={styles.info}>
                    <h1>{title}</h1>
                    <p>{subtitle}</p>
                </div>
            </div>
        </header>
    );
}
