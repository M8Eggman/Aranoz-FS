import React, { useEffect, useMemo, useRef, useState } from "react";
import styles from "./ProductsCarousel.module.css";
import ProductCards from "@/Components/Cards/ProductCards";

export default function BestSellersCarousel({ bestSellers = [] }) {
    const [perSlide, setPerSlide] = useState(getPerSlide());
    const slides = useMemo(
        () => chunkAndPad(bestSellers, perSlide),
        [bestSellers, perSlide]
    );
    const [index, setIndex] = useState(0);
    const timerRef = useRef(null);

    function chunkAndPad(items, perSlide) {
        if (!Array.isArray(items)) return [];
        const padded = [...items];
        const remainder = items.length % perSlide;
        if (remainder !== 0) {
            const needed = perSlide - remainder;
            for (let i = 0; i < needed; i++) {
                padded.push(items[i % items.length]);
            }
        }
        const chunks = [];
        for (let i = 0; i < padded.length; i += perSlide) {
            chunks.push(padded.slice(i, i + perSlide));
        }
        return chunks;
    }

    function getPerSlide() {
        const width = typeof window !== "undefined" ? window.innerWidth : 1200;
        if (width > 1200) return 4;
        if (width > 900) return 3;
        return 2;
    }

    function resetAutoplay() {
        if (timerRef.current) clearTimeout(timerRef.current);
        timerRef.current = setTimeout(() => {
            setIndex((i) => (slides.length ? (i + 1) % slides.length : 0));
        }, 5000);
    }

    function goPrev() {
        setIndex((i) =>
            slides.length ? (i - 1 + slides.length) % slides.length : 0
        );
        resetAutoplay();
    }

    function goNext() {
        setIndex((i) => (slides.length ? (i + 1) % slides.length : 0));
        resetAutoplay();
    }

    useEffect(() => {
        const onResize = () => setPerSlide(getPerSlide());
        window.addEventListener("resize", onResize);
        return () => window.removeEventListener("resize", onResize);
    }, []);

    useEffect(() => {
        setIndex((i) => (slides.length === 0 ? 0 : i % slides.length));
    }, [slides.length]);

    useEffect(() => {
        resetAutoplay();
        return () => timerRef.current && clearTimeout(timerRef.current);
    }, [index, slides.length]);

    return (
        <section className={styles.wrapper}>
            <div className={styles.headerRow}>
                <h3 className={styles.heading}>Best Sellers</h3>
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
            </div>

            <div className={styles.viewport}>
                <div
                    className={styles.track}
                    style={{ transform: `translateX(-${index * 100}%)` }}
                >
                    {slides.map((group, gi) => (
                        <div key={gi} className={styles.slide}>
                            {group.map((p, pi) => (
                                <ProductCards
                                    key={pi}
                                    id={p.id}
                                    image={p?.images_main?.banner}
                                    name={p.name}
                                    price={p.price}
                                    promotion={p.promotion}
                                    final_price={p.final_price}
                                />
                            ))}
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
