import React, { useEffect, useState } from "react";
import { router } from "@inertiajs/react";
import { IoMdMail, IoMdMailOpen } from "react-icons/io"; // icônes
import BackLayout from "@/Layouts/BackLayout";
import AdminHeader from "../partials/Header/AdminHeader";
import FlashMessage from "@/Components/FlashMessage/FlashMessage";
import AdminButton from "@/Components/Buttons/AdminPage/AdminButton";
import styles from "./Mailings.module.css";

export default function Mailings({ mailings, status }) {
    const [selectedMail, setSelectedMail] = useState(null);
    const statuses = ["all", "archived"];

    // Réinitialise le selectedMail quand on change de page
    useEffect(() => {
        setSelectedMail(null);
    }, [status]);

    const changeStatus = (s) => {
        router.get(
            route("admin.mailings", s === "all" ? "" : s),
            {},
            { preserveScroll: true, preserveState: true }
        );
    };

    const handleRead = (id) => {
        router.put(
            route("admin.mailings.read", id),
            {},
            { preserveScroll: true, preserveState: true }
        );
    };

    const handleArchive = (id) => {
        router.put(
            route("admin.mailings.archive", id),
            {},
            { preserveScroll: true, preserveState: true }
        );
    };

    const handleDelete = (id) => {
        router.delete(route("admin.mailings.destroy", id), {
            preserveScroll: true,
            preserveState: true,
        });
    };

    const handleSelect = (mail) => {
        setSelectedMail(mail);
        if (!mail.status) handleRead(mail.id);
    };

    return (
        <>
            <AdminHeader title="Mail Inbox" />
            <section className={styles.container}>
                <div className={styles.filters}>
                    {statuses.map((s) => (
                        <AdminButton
                            key={s}
                            variant={status === s ? "edit" : "default"}
                            onClick={() => changeStatus(s)}
                        >
                            {s.charAt(0).toUpperCase() + s.slice(1)}
                        </AdminButton>
                    ))}
                </div>
                <div className={styles.mailLayout}>
                    <div className={styles.mailList}>
                        {mailings.length === 0 ? (
                            <p className={styles.empty}>No mails found.</p>
                        ) : (
                            <>
                                {mailings.map((mail) => (
                                    <div
                                        key={mail.id}
                                        className={`${styles.mailItem} ${
                                            selectedMail?.id === mail.id
                                                ? styles.active
                                                : ""
                                        } ${mail.status ? styles.read : ""}`}
                                        onClick={() => handleSelect(mail)}
                                    >
                                        <div className={styles.mailHeader}>
                                            <span className={styles.subject}>
                                                {mail.subject}
                                            </span>
                                            <span className={styles.statusIcon}>
                                                {mail.status ? (
                                                    <IoMdMailOpen color="#86a5c2" />
                                                ) : (
                                                    <IoMdMail color="#ff3368" />
                                                )}
                                            </span>
                                        </div>
                                        <p className={styles.preview}>
                                            {mail.message.slice(0, 30)}...
                                        </p>
                                        <span className={styles.email}>
                                            {mail.email}
                                        </span>
                                    </div>
                                ))}
                            </>
                        )}
                    </div>

                    <div className={styles.mailContent}>
                        {selectedMail ? (
                            <>
                                <FlashMessage />
                                <h2>{selectedMail.subject}</h2>
                                <p className={styles.from}>
                                    From: <strong>{selectedMail.email}</strong>
                                </p>
                                <p className={styles.message}>
                                    {selectedMail.message}
                                </p>
                                <div className={styles.actions}>
                                    {!selectedMail.isArchived && (
                                        <AdminButton
                                            variant="delete"
                                            onClick={() =>
                                                handleArchive(selectedMail.id)
                                            }
                                        >
                                            Archive
                                        </AdminButton>
                                    )}
                                    <AdminButton
                                        variant="delete"
                                        onClick={() =>
                                            handleDelete(selectedMail.id)
                                        }
                                    >
                                        Delete
                                    </AdminButton>
                                </div>
                            </>
                        ) : (
                            <div className={styles.emptyContent}>
                                Select a mail to view it
                            </div>
                        )}
                    </div>
                </div>
            </section>
        </>
    );
}

Mailings.layout = (page) => <BackLayout>{page}</BackLayout>;
