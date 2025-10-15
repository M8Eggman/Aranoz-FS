import React, { useEffect, useState } from "react";
import { usePage, useForm } from "@inertiajs/react";
import styles from "./WeeklySale.module.css";
import InputError from "@/Components/InputError";
import InputSuccess from "@/Components/InputSuccess";
import Loader from "@/Components/Loader/Loader";

export default function WeeklySale({ until }) {
    const { auth } = usePage().props;

    // Compte à rebours
    const end = new Date(until);
    const [now, setNow] = useState(Date.now());
    useEffect(() => {
        const id = setInterval(() => setNow(Date.now()), 1000);
        return () => clearInterval(id);
    }, []);

    const diff = Math.max(0, end.getTime() - now);
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((diff / (1000 * 60)) % 60);
    const seconds = Math.floor((diff / 1000) % 60);

    // useForm d’Inertia
    const {
        data,
        setData,
        post,
        errors,
        reset,
        processing,
        recentlySuccessful,
    } = useForm({
        email: "",
    });

    function submit(e) {
        e.preventDefault();
        post(route("weekly-sales.subscribe"), {
            preserveScroll: true,
            preserveState: true,
            onSuccess: () => reset("email"),
        });
    }

    return (
        <section className={styles.wrapper}>
            <div className={styles.container}>
                <h3 className={styles.title}>
                    Weekly Sale on 60% Off All Products
                </h3>

                {/* Compte à rebours */}
                <div className={styles.countdown}>
                    <div className={styles.unit}>
                        <span>DAYS</span>
                        <strong>{String(days).padStart(2, "0")}</strong>
                    </div>
                    <div className={styles.unit}>
                        <span>HOURS</span>
                        <strong>{String(hours).padStart(2, "0")}</strong>
                    </div>
                    <div className={styles.unit}>
                        <span>MINUTES</span>
                        <strong>{String(minutes).padStart(2, "0")}</strong>
                    </div>
                    <div className={styles.unit}>
                        <span>SECONDS</span>
                        <strong>{String(seconds).padStart(2, "0")}</strong>
                    </div>
                </div>

                <form onSubmit={submit} className={styles.form}>
                    {!auth?.user && (
                        <input
                            type="email"
                            placeholder="Enter Email Address"
                            value={data.email}
                            onChange={(e) => setData("email", e.target.value)}
                            required
                            className={styles.input}
                        />
                    )}

                    <button
                        type="submit"
                        className={`${styles.button} ${
                            auth?.user ? styles.connected : ""
                        }`}
                    >
                        {processing ? (
                            <>
                                <Loader size="16px" /> Inscription...
                            </>
                        ) : (
                            "BOOK NOW"
                        )}
                    </button>
                </form>
                {recentlySuccessful && (
                    <InputSuccess
                        message="Successfully subscribed!"
                        className="mt-3"
                    />
                )}
                {errors.email && (
                    <InputError message={errors.email} className="mt-3" />
                )}
            </div>
        </section>
    );
}
