import React from "react";
import styles from "./Footer.module.css";
import { useForm, usePage } from "@inertiajs/react";
import Button from "../Form/Buttons/Button";
import TextInput from "../Form/TextInput/TextInput";
import { FaFacebookF, FaTwitter, FaBehance, FaHeart } from "react-icons/fa";
import { FaGlobe } from "react-icons/fa6";
import InputError from "../InputError";
import InputSuccess from "../InputSuccess";

export default function Footer() {
    const { auth } = usePage().props;

    const { data, setData, post, processing, errors, reset, wasSuccessful } =
        useForm({
            email: auth?.user?.email || "",
        });

    const handleSubmit = (e) => {
        e.preventDefault();

        // Si l'utilisateur est connecté, on n'envoie pas de champ email (le backend le récupère via auth)
        const payload = auth?.user ? {} : { email: data.email };

        post(route("newsletter.subscribe"), {
            data: payload,
            preserveScroll: true,
            preserveState: true,
            onSuccess: () => {
                reset("email");
            },
        });
    };

    return (
        <footer className={styles.footer}>
            <div className={styles.container}>
                <div className={styles.grid}>
                    <div className={styles.col}>
                        <h4 className={styles.title}>Top Products</h4>
                        <ul className={styles.list}>
                            <li>Managed Website</li>
                            <li>Manage Reputation</li>
                            <li>Power Tools</li>
                            <li>Marketing Service</li>
                        </ul>
                    </div>
                    <div className={styles.col}>
                        <h4 className={styles.title}>Quick Links</h4>
                        <ul className={styles.list}>
                            <li>Jobs</li>
                            <li>Brand Assets</li>
                            <li>Investor Relations</li>
                            <li>Terms of Service</li>
                        </ul>
                    </div>
                    <div className={styles.col}>
                        <h4 className={styles.title}>Features</h4>
                        <ul className={styles.list}>
                            <li>Jobs</li>
                            <li>Brand Assets</li>
                            <li>Investor Relations</li>
                            <li>Terms of Service</li>
                        </ul>
                    </div>
                    <div className={styles.col}>
                        <h4 className={styles.title}>Resources</h4>
                        <ul className={styles.list}>
                            <li>Guides</li>
                            <li>Research</li>
                            <li>Experts</li>
                            <li>Agencies</li>
                        </ul>
                    </div>
                    <div className={styles.colNewsletter}>
                        <h4 className={styles.title}>Newsletter</h4>
                        <p className={styles.newsText}>
                            Subscribe to our newsletter to receive the latest
                            news, special offers and tips directly in your
                            inbox.
                        </p>

                        <form
                            className={styles.newsForm}
                            onSubmit={handleSubmit}
                        >
                            {/* Si l'utilisateur n'est pas connecté, affiche le champ email */}
                            {!auth?.user && (
                                <TextInput
                                    type="email"
                                    className={styles.newsInput}
                                    placeholder="Email Address"
                                    value={data.email}
                                    onChange={(e) =>
                                        setData("email", e.target.value)
                                    }
                                    required
                                />
                            )}

                            <Button
                                type="submit"
                                className={`${styles.newsButton} ${
                                    auth?.user ? styles.connected : ""
                                }`}
                                disabled={processing}
                            >
                                Subscribe
                            </Button>
                        </form>

                        {wasSuccessful && (
                            <InputSuccess
                                message={"Successfully subscribed!"}
                                className="mt-2"
                            />
                        )}

                        {errors.email && (
                            <InputError
                                message={errors.email}
                                className="mt-2"
                            />
                        )}
                    </div>
                </div>
                <div className={styles.copyright}>
                    <p className={styles.left}>
                        © 2025 Aranoz. Tous droits réservés. Créé avec{" "}
                        <span className={styles.heart}>
                            <FaHeart />
                        </span>{" "}
                        par l'équipe{" "}
                        <span className={styles.aranoz}>Aranoz.</span>
                    </p>
                    <div className={styles.socials}>
                        <FaFacebookF />
                        <FaTwitter />
                        <FaGlobe />
                        <FaBehance />
                    </div>
                </div>
            </div>
        </footer>
    );
}
