import React, { useEffect, useRef, useState } from "react";
import styles from "./Carousel.module.css";

export default function Carousel({ slides }) {
    const items = slides;
    const [index, setIndex] = useState(0);
    const timerRef = useRef(null);

    const resetAutoplay = () => {
        if (timerRef.current) {
            clearTimeout(timerRef.current);
        }
        timerRef.current = setTimeout(() => {
            setIndex((i) => (i === items.length - 1 ? 0 : i + 1));
        }, 5000);
    };

    useEffect(() => {
        resetAutoplay();
        return () => {
            if (timerRef.current) clearTimeout(timerRef.current);
        };
        // re-arm on slide change or items length change
    }, [index, items.length]);

    const goPrev = () => {
        setIndex((i) => (i === 0 ? items.length - 1 : i - 1));
        resetAutoplay();
    };
    const goNext = () => {
        setIndex((i) => (i === items.length - 1 ? 0 : i + 1));
        resetAutoplay();
    };

    const active = items[index];

    return (
        <section className={styles.wrapper}>
            <div key={index} className={styles.slide}>
                <div className={styles.content}>
                    <h2 className={styles.title}>{active.title}</h2>
                    <p className={styles.description}>{active.description}</p>
                </div>

                <div className={styles.visual}>
                    <img
                        className={styles.image}
                        src={active.image}
                        alt={active.title}
                    />
                    <span className={styles.index}>{active.number}</span>
                </div>
            </div>

            <div className={styles.controls}>
                <button
                    onClick={goPrev}
                    className={styles.navBtn}
                    type="button"
                >
                    Previous
                </button>
                <span className={styles.sep}>|</span>
                <button
                    onClick={goNext}
                    className={styles.navBtn}
                    type="button"
                >
                    Next
                </button>
            </div>
        </section>
    );
}
