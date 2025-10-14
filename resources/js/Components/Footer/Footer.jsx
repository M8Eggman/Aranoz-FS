import React from "react";
import styles from "./Footer.module.css";
import { useForm } from "@inertiajs/react";
import Button from "../Form/Buttons/Button";
import TextInput from "../Form/TextInput/TextInput";
import { FaFacebookF, FaTwitter, FaBehance, FaHeart } from "react-icons/fa";
import { FaGlobe } from "react-icons/fa6";

export default function Footer() {
    const { data, setData, post, processing, errors, reset, wasSuccessful } =
        useForm({
            email: "",
        });

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route("newsletter.subscribe"), {
            onSuccess: () => {
                reset();
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
                            Abonnez-vous à notre newsletter pour recevoir les
                            dernières actualités, offres spéciales et conseils
                            directement dans votre boîte mail.
                        </p>
                        <form
                            className={styles.newsForm}
                            onSubmit={handleSubmit}
                        >
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
                            <Button
                                type="submit"
                                className={styles.newsButton}
                                disabled={processing}
                            >
                                subscribe
                            </Button>
                        </form>
                        {wasSuccessful && (
                            <div className={styles.success}>Subscribed!</div>
                        )}
                        {errors.email && (
                            <div className={styles.error}>{errors.email}</div>
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
