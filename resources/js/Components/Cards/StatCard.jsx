import React from "react";
import styles from "./StatCard.module.css";

export default function StatCard({ icon: Icon, title, value }) {
    return (
        <div className={styles.card}>
            <div className={styles.icon}>
                <Icon size={32} />
            </div>
            <div className={styles.info}>
                <div className={styles.value}>{value}</div>
                <div className={styles.title}>{title}</div>
            </div>
        </div>
    );
}
