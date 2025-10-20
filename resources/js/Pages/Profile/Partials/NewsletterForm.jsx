import { useForm } from "@inertiajs/react";
import AdminButton from "@/Components/Buttons/AdminPage/AdminButton";
import InputError from "@/Components/InputError";
import InputSuccess from "@/Components/InputSuccess";
import Loader from "@/Components/Loader/Loader";
import styles from "../Edit.module.css";

export default function NewsletterForm({ user, subscribed }) {
    const { post, processing, errors, recentlySuccessful } = useForm({
        email: user.email || "",
    });

    const handleSubscribe = () => {
        post(route("newsletter.subscribe"), {
            preserveScroll: true,
            preserveState: true,
        });
    };

    const handleUnsubscribe = () => {
        post(route("newsletter.unsubscribe"), {
            preserveScroll: true,
            preserveState: true,
        });
    };

    return (
        <form className={styles.card} onSubmit={(e) => e.preventDefault()}>
            <h2 className={styles.cardTitle}>Newsletter</h2>
            <p>Manage your newsletter subscription:</p>

            <div className={styles.inputGroup}>
                {subscribed ? (
                    <AdminButton
                        type="button"
                        variant="delete"
                        disabled={processing}
                        onClick={handleUnsubscribe}
                        className={"flex items-center justify-center gap-2"}
                    >
                        {processing ? (
                            <>
                                <Loader size="16px" /> Unsubscribing...
                            </>
                        ) : (
                            "Unsubscribe"
                        )}
                    </AdminButton>
                ) : (
                    <AdminButton
                        type="button"
                        disabled={processing}
                        onClick={handleSubscribe}
                        className={"flex items-center justify-center gap-2"}
                    >
                        {processing ? (
                            <>
                                <Loader size="16px" color="black" />{" "}
                                Subscribing...
                            </>
                        ) : (
                            "Subscribe"
                        )}
                    </AdminButton>
                )}
            </div>

            {errors.email && <InputError message={errors.email} />}
            {recentlySuccessful && (
                <InputSuccess
                    message={
                        subscribed
                            ? "Successfully unsubscribed!"
                            : "Successfully subscribed!"
                    }
                />
            )}
        </form>
    );
}
