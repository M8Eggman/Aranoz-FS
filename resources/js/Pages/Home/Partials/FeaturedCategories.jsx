import React from "react";
import styles from "./FeaturedCategories.module.css";
import { Link, router } from "@inertiajs/react";
import { IoMdArrowDropright } from "react-icons/io";
import { capitalize, formatUnderscore } from "@/utils/StringHelper";

export default function FeaturedCategories({ categories = [] }) {
    const items = categories;

    return (
        <section className={styles.wrapper}>
            <div className={styles.container}>
                <h3 className={styles.heading}>Featured Category</h3>
                <div className={styles.grid}>
                    {items.map((c, idx) => (
                        <div
                            key={idx}
                            onClick={() => router.visit(route("products"))}
                            className={styles.card}
                        >
                            <div className={styles.textBlock}>
                                <span className={styles.subtitle}>
                                    Premium Quality
                                </span>
                                <h4 className={styles.title}>
                                    {capitalize(c.name)}
                                </h4>
                            </div>
                            <div className={styles.image}>
                                <img src={c.image} alt={c.title} />
                            </div>
                            <span className={styles.link}>
                                Explore now <IoMdArrowDropright size={30} />
                            </span>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
