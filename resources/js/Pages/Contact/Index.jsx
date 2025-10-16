import PublicHeader from "@/Components/Header/PublicHeader";
import FrontLayout from "@/Layouts/FrontLayout";
import React from "react";
import { useForm } from "@inertiajs/react";
import { usePage } from "@inertiajs/react";
import TextInput from "@/Components/Form/TextInput/TextInput";
import Button from "@/Components/Form/Buttons/Button";
import { FaHome, FaPhone, FaEnvelope } from "react-icons/fa";
import FlashMessage from "@/Components/FlashMessage/FlashMessage";
import styles from "./Contact.module.css";
import Textarea from "@/Components/Form/Textarea/Textarea";
import InputError from "@/Components/InputError";

export default function Contact({ contactInfo }) {
    const user = usePage().props.auth?.user || null;

    const { data, setData, post, processing, errors } = useForm({
        name: user?.name || "",
        email: user?.email || "",
        subject: "",
        message: "",
    });

    function handleChange(e) {
        setData(e.target.name, e.target.value);
    }

    function handleSubmit(e) {
        e.preventDefault();
        post(route("contact.store"), {
            preserveScroll: true,
            preserveState: true,
        });
    }

    return (
        <>
            <PublicHeader title="Contact Us" subtitle="Home - Contact Us" />
            <div className={styles.container}>
                <div className={styles.map}>
                    <iframe
                        src={`https://www.google.com/maps?q=${encodeURIComponent(
                            `${contactInfo.number} ${contactInfo.street}, ${contactInfo.zip_code} ${contactInfo.city}, ${contactInfo.country_code}`
                        )}&output=embed`}
                        title="Map"
                        className={styles.iframe}
                        allowFullScreen
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                    />
                </div>

                <h2 className={styles.title}>Get in Touch</h2>

                <FlashMessage />

                <div className={styles.formWrapper}>
                    <form className={styles.form} onSubmit={handleSubmit}>
                        <div className={styles.row}>
                            <div className={styles.input}>
                                <TextInput
                                    name="name"
                                    placeholder="Enter Name"
                                    value={data.name}
                                    onChange={handleChange}
                                    disabled={!!user}
                                    className={styles.input}
                                />
                                {errors.name && (
                                    <p className="errorText">{errors.name}</p>
                                )}
                            </div>

                            <div className={styles.input}>
                                <TextInput
                                    name="email"
                                    placeholder="Enter Email"
                                    value={data.email}
                                    onChange={handleChange}
                                    className={styles.input}
                                    disabled={!!user}
                                />
                                {errors.email && (
                                    <p className="errorText">{errors.email}</p>
                                )}
                            </div>
                        </div>
                        <div className={styles.input}>
                            <TextInput
                                name="subject"
                                placeholder="Enter Subject"
                                value={data.subject}
                                onChange={handleChange}
                                className={styles.input}
                            />
                            {errors.subject && (
                                <InputError message={errors.subject} />
                            )}
                        </div>
                        <div className={styles.input}>
                            <Textarea
                                name="message"
                                placeholder="Enter Message"
                                value={data.message}
                                onChange={handleChange}
                                className={styles.input}
                                rows={5}
                            />
                            {errors.message && (
                                <InputError message={errors.message} />
                            )}
                        </div>

                        <Button
                            type="submit"
                            className={styles.button}
                            disabled={processing}
                        >
                            {processing ? "sending..." : "SEND MESSAGE"}
                        </Button>
                    </form>

                    <div className={styles.info}>
                        <div className={styles.infoRow}>
                            <FaHome className={styles.infoIcon} />
                            <div>
                                <p className={styles.infoTitle}>
                                    {contactInfo.number}, {contactInfo.street}
                                </p>
                                <p>
                                    {contactInfo.city}, {contactInfo.zip_code}
                                </p>
                            </div>
                        </div>

                        <div className={styles.infoRow}>
                            <FaPhone className={styles.infoIcon} />
                            <div>
                                <p className={styles.infoTitle}>
                                    {contactInfo.phone_number}
                                </p>
                                <p>Mon to Fri 9am to 6pm</p>
                            </div>
                        </div>

                        <div className={styles.infoRow}>
                            <FaEnvelope className={styles.infoIcon} />
                            <div>
                                <p className={styles.infoTitle}>
                                    {contactInfo.email}
                                </p>
                                <p>Send us your query anytime!</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

Contact.layout = (page) => <FrontLayout>{page}</FrontLayout>;
