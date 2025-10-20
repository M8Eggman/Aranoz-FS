import React from "react";
import { usePage, useForm } from "@inertiajs/react";
import styles from "./Newsletter.module.css";
import InputError from "@/Components/InputError";
import InputSuccess from "@/Components/InputSuccess";
import Loader from "@/Components/Loader/Loader";

export default function Newsletter() {
    const { auth } = usePage().props;

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
        post(route("newsletter.subscribe"), {
            preserveScroll: true,
            preserveState: true,
            onSuccess: () => reset("email"),
        });
    }

    return (
        <section className={styles.wrapper}>
            {/* images du background */}
            <img
                src="/storage/breadcrumb/newsletter.png"
                alt=""
                className={styles.backgroundImage}
            />
            <img
                src="/storage/breadcrumb/newsletter.png"
                alt=""
                className={styles.backgroundImage}
            />
            <img
                src="/storage/breadcrumb/newsletter.png"
                alt=""
                className={styles.backgroundImage}
            />
            <div className={styles.container}>
                <p className={styles.subtitle}>JOIN OUR NEWSLETTER</p>
                <h3 className={styles.title}>
                    Subscribe to get Updated with new offers
                </h3>

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
                            "SUBSCRIBE NOW"
                        )}
                    </button>
                </form>
                {recentlySuccessful && (
                    <InputSuccess message="Successfully subscribed!" />
                )}
                {errors.email && <InputError message={errors.email} />}
            </div>
        </section>
    );
}
