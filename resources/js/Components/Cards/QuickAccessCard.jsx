import React from "react";
import { Link } from "@inertiajs/react";
import styles from "./QuickAccessCard.module.css";

export default function QuickAccessCard({ title, description, links }) {
    return (
        <div className={styles.card}>
            <div className={styles.content}>
                <h3>{title}</h3>
                <p className={styles.description}>{description}</p>
            </div>
            <ul className={styles.linkList}>
                {links.map((link, i) => (
                    <li key={i}>
                        <Link
                            href={
                                link.params
                                    ? route(link.route, link.params)
                                    : route(link.route)
                            }
                        >
                            {link.text}
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    );
}
