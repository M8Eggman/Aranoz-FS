import React from "react";
import styles from "./AdminHeader.module.css";

export default function AdminHeader({ title = "" }) {
    return (
        <header className={styles.header}>
            <div className={styles.top}>
                <div className={styles.info}>
                    <h1>{title}</h1>
                    <p>Aranoz - Shop System</p>
                </div>
                <div className={styles.image}>
                    <img
                        src="/storage/breadcrumb/stool.png"
                        alt=""
                    />
                </div>
            </div>
        </header>
    );
}
