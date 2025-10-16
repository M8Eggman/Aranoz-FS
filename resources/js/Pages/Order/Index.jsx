import React, { useState } from "react";
import { router, usePage } from "@inertiajs/react";
import styles from "./Order.module.css";
import PublicHeader from "@/Components/Header/PublicHeader";
import FrontLayout from "@/Layouts/FrontLayout";
import Button from "@/Components/Form/Buttons/Button";
import TextInput from "@/Components/Form/TextInput/TextInput";
import { FaExclamationTriangle, FaPhone } from "react-icons/fa";

export default function Index({ contactInfo }) {
    const { flash } = usePage().props;
    const [orderId, setOrderId] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!orderId.trim()) return;

        router.visit(`${route("track-your-order")}?order_number=${orderId}`, {
            preserveScroll: true,
            preserveState: true,
            onSuccess: () => {
                setOrderId("");
            },
        });
    };

    return (
        <>
            <PublicHeader
                title="Tracking Order"
                subtitle="Home - Tracking Order"
            />
            <section className={styles.wrapper}>
                <div className={styles.container}>
                    {flash?.error && (
                        <div className={styles.error}>
                            <p className={styles.errorText}>
                                <span className={styles.errorIcon}>
                                    <FaExclamationTriangle />
                                </span>
                                {flash.error}
                            </p>
                            <p className={styles.errorText}>
                                <span className={styles.errorIcon}>
                                    <FaPhone />
                                </span>
                                In case of problem, please contact us at{" "}
                                <span className={styles.phoneNumber}>
                                    {contactInfo.phone_number}
                                </span>
                            </p>
                        </div>
                    )}

                    <p className={styles.description}>
                        To track your order please enter your Order ID in the
                        box below and press the Track• button. This was given to
                        you on your receipt and in the confirmation email you
                        should have received,
                    </p>

                    <form className={styles.form} onSubmit={handleSubmit}>
                        <TextInput
                            type="text"
                            placeholder="Order ID"
                            name="order_id"
                            value={orderId}
                            onChange={(e) => setOrderId(e.target.value)}
                        />
                        <Button type="submit">TRACK ORDER</Button>
                    </form>
                </div>
            </section>
        </>
    );
}

Index.layout = (page) => <FrontLayout>{page}</FrontLayout>;
