import { useEffect, useState } from "react";
import { usePage } from "@inertiajs/react";
import styles from "./FlashMessage.module.css";

export default function FlashMessage() {
    const { flash } = usePage().props;
    const [visible, setVisible] = useState(false);
    const [message, setMessage] = useState("");
    const [type, setType] = useState("success");

    useEffect(() => {
        if (flash?.success) {
            setMessage(flash.success);
            setType("success");
            setVisible(true);
        } else if (flash?.error) {
            setMessage(flash.error);
            setType("error");
            setVisible(true);
        }

        if (flash?.success || flash?.error) {
            const timer = setTimeout(() => setVisible(false), 5050);
            return () => clearTimeout(timer);
        }
    }, [flash]);

    if (!visible || !message) return null;

    return (
        <div
            className={`${styles.flashMessage} ${
                type === "success" ? styles.flashSuccess : styles.flashError
            }`}
        >
            {message}
        </div>
    );
}
