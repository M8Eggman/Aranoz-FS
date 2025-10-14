import { Head } from "@inertiajs/react";
import FrontLayout from "@/Layouts/FrontLayout";
import styles from "./Edit.module.css";
import TextInput from "@/Components/TextInput";
import InputLabel from "@/Components/InputLabel";
import InputError from "@/Components/InputError";
import PrimaryButton from "@/Components/PrimaryButton";
import DangerButton from "@/Components/DangerButton";

import { useState } from "react";
import { router, usePage } from "@inertiajs/react";
import AdminButton from "@/Components/Buttons/AdminPage/AdminButton";

export default function Edit({ status, subscribed }) {
    console.log(subscribed);

    const user = usePage().props.auth?.user || {};

    // Profile form state
    const [profile, setProfile] = useState({
        name: user.name || "",
        email: user.email || "",
    });
    const [profileStatus, setProfileStatus] = useState("");
    const [profileError, setProfileError] = useState({});

    // Password form state
    const [passwords, setPasswords] = useState({
        current_password: "",
        password: "",
        password_confirmation: "",
    });
    const [passwordStatus, setPasswordStatus] = useState("");
    const [passwordError, setPasswordError] = useState({});

    // Delete form state
    const [deletePassword, setDeletePassword] = useState("");
    const [deleteStatus, setDeleteStatus] = useState("");
    const [deleteError, setDeleteError] = useState("");

    // Newsletter state
    const [newsletterStatus, setNewsletterStatus] = useState("");
    const [newsletterError, setNewsletterError] = useState("");

    const handleProfileChange = (e) => {
        setProfile({ ...profile, [e.target.name]: e.target.value });
    };
    const handleProfileSubmit = (e) => {
        e.preventDefault();
        router.patch(route("profile.update"), profile, {
            onSuccess: () => {
                setProfileStatus("Profile updated!");
                setProfileError({});
            },
            onError: (errors) => {
                setProfileStatus("");
                setProfileError(errors);
            },
        });
    };

    const handlePasswordChange = (e) => {
        setPasswords({ ...passwords, [e.target.name]: e.target.value });
    };
    const handlePasswordSubmit = (e) => {
        e.preventDefault();
        router.put(route("password.update"), passwords, {
            onSuccess: () => {
                setPasswordStatus("Password updated!");
                setPasswordError({});
            },
            onError: (errors) => {
                setPasswordStatus("");
                setPasswordError(errors);
            },
        });
    };

    const handleDeleteChange = (e) => {
        setDeletePassword(e.target.value);
    };
    const handleDeleteSubmit = (e) => {
        e.preventDefault();
        router.delete(route("profile.destroy"), {
            data: { password: deletePassword },
            onSuccess: () => {
                setDeleteStatus("Account deleted!");
                setDeleteError("");
            },
            onError: (errors) => {
                setDeleteStatus("");
                setDeleteError(errors.password);
            },
        });
    };

    const handleSubscribe = (e) => {
        e.preventDefault();
        setNewsletterStatus("");
        setNewsletterError("");
        router.post(
            route("newsletter.subscribe"),
            { email: user.email },
            {
                onSuccess: () =>
                    setNewsletterStatus(
                        "Inscription à la newsletter réussie !"
                    ),
                onError: (errors) =>
                    setNewsletterError(
                        errors.email || "Erreur lors de l'inscription."
                    ),
            }
        );
    };

    const handleUnsubscribe = (e) => {
        e.preventDefault();
        setNewsletterStatus("");
        setNewsletterError("");
        router.post(
            route("newsletter.unsubscribe"),
            { email: user.email },
            {
                onSuccess: () =>
                    setNewsletterStatus(
                        "Désinscription de la newsletter réussie !"
                    ),
                onError: (errors) =>
                    setNewsletterError(
                        errors.email || "Erreur lors de la désinscription."
                    ),
            }
        );
    };

    return (
        <FrontLayout>
            <Head title="Profile" />
            <div className={styles.container}>
                <div className={styles.center}>
                    <form
                        className={styles.card}
                        onSubmit={handleProfileSubmit}
                    >
                        <h2 className={styles.cardTitle}>
                            Profile Information
                        </h2>
                        <div className={styles.inputGroup}>
                            <InputLabel htmlFor="name" className={styles.label}>
                                Name
                            </InputLabel>
                            <TextInput
                                type="text"
                                id="name"
                                name="name"
                                className={styles.input}
                                value={profile.name}
                                onChange={handleProfileChange}
                                autoComplete="name"
                            />
                            <InputError message={profileError.name} />
                        </div>
                        <div className={styles.inputGroup}>
                            <InputLabel
                                htmlFor="email"
                                className={styles.label}
                            >
                                Email
                            </InputLabel>
                            <TextInput
                                type="email"
                                id="email"
                                name="email"
                                className={styles.input}
                                value={profile.email}
                                onChange={handleProfileChange}
                                autoComplete="email"
                            />
                            <InputError message={profileError.email} />
                        </div>
                        <AdminButton type="submit" className={styles.button}>
                            Update Profile
                        </AdminButton>
                        {(status || profileStatus) && (
                            <div className={styles.status}>
                                {status || profileStatus}
                            </div>
                        )}
                    </form>

                    <form
                        className={styles.card}
                        onSubmit={handlePasswordSubmit}
                    >
                        <h2 className={styles.cardTitle}>Update Password</h2>
                        <div className={styles.inputGroup}>
                            <InputLabel
                                htmlFor="current_password"
                                className={styles.label}
                            >
                                Current Password
                            </InputLabel>
                            <TextInput
                                type="password"
                                id="current_password"
                                name="current_password"
                                className={styles.input}
                                value={passwords.current_password}
                                onChange={handlePasswordChange}
                                autoComplete="current-password"
                            />
                            <InputError
                                message={passwordError.current_password}
                            />
                        </div>
                        <div className={styles.inputGroup}>
                            <InputLabel
                                htmlFor="password"
                                className={styles.label}
                            >
                                New Password
                            </InputLabel>
                            <TextInput
                                type="password"
                                id="password"
                                name="password"
                                className={styles.input}
                                value={passwords.password}
                                onChange={handlePasswordChange}
                                autoComplete="new-password"
                            />
                            <InputError message={passwordError.password} />
                        </div>
                        <div className={styles.inputGroup}>
                            <InputLabel
                                htmlFor="password_confirmation"
                                className={styles.label}
                            >
                                Confirm New Password
                            </InputLabel>
                            <TextInput
                                type="password"
                                id="password_confirmation"
                                name="password_confirmation"
                                className={styles.input}
                                value={passwords.password_confirmation}
                                onChange={handlePasswordChange}
                                autoComplete="new-password"
                            />
                            <InputError
                                message={passwordError.password_confirmation}
                            />
                        </div>
                        <AdminButton type="submit" className={styles.button}>
                            Update Password
                        </AdminButton>
                        {passwordStatus && (
                            <div className={styles.status}>
                                {passwordStatus}
                            </div>
                        )}
                    </form>

                    <form className={styles.card} onSubmit={handleDeleteSubmit}>
                        <h2 className={`${styles.cardTitle} ${styles.danger}`}>
                            Delete Account
                        </h2>
                        <div className={styles.inputGroup}>
                            <InputLabel
                                htmlFor="delete_password"
                                className={styles.label}
                            >
                                Password
                            </InputLabel>
                            <TextInput
                                type="password"
                                id="delete_password"
                                name="delete_password"
                                className={styles.input}
                                value={deletePassword}
                                onChange={handleDeleteChange}
                                autoComplete="current-password"
                            />
                            <InputError message={deleteError} />
                        </div>
                        <AdminButton
                            type="submit"
                            variant="delete"
                            className={`${styles.button} ${styles.buttonDanger}`}
                        >
                            Delete Account
                        </AdminButton>
                        {deleteStatus && (
                            <div className={styles.status}>{deleteStatus}</div>
                        )}
                    </form>

                    <form className={styles.card}>
                        <h2 className={styles.cardTitle}>Newsletter</h2>
                        <p>Gérez votre abonnement à la newsletter :</p>
                        <div className={styles.inputGroup}>
                            {subscribed ? (
                                <AdminButton
                                    type="button"
                                    variant="delete"
                                    className={`${styles.button} ${styles.buttonDanger}`}
                                    onClick={handleUnsubscribe}
                                >
                                    Se désinscrire
                                </AdminButton>
                            ) : (
                                <AdminButton
                                    type="button"
                                    className={styles.button}
                                    onClick={handleSubscribe}
                                >
                                    S'inscrire
                                </AdminButton>
                            )}
                            {newsletterError && (
                                <InputError message={newsletterError} />
                            )}
                        </div>
                        {newsletterStatus && (
                            <div className={styles.status}>
                                {newsletterStatus}
                            </div>
                        )}
                    </form>
                </div>
            </div>
        </FrontLayout>
    );
}
