import { useForm } from "@inertiajs/react";
import InputLabel from "@/Components/Form/InputLabel/InputLabel";
import TextInput from "@/Components/Form/TextInput/TextInput";
import InputError from "@/Components/InputError";
import InputSuccess from "@/Components/InputSuccess";
import AdminButton from "@/Components/Buttons/AdminPage/AdminButton";
import Loader from "@/Components/Loader/Loader";
import styles from "../Edit.module.css";

export default function DeleteUserForm() {
    const {
        data,
        setData,
        delete: destroy,
        errors,
        processing,
        recentlySuccessful,
    } = useForm({ password: "" });

    const submit = (e) => {
        e.preventDefault();
        destroy(route("profile.destroy"), {
            preserveScroll: true,
            preserveState: true,
        });
    };

    return (
        <form className={styles.card} onSubmit={submit}>
            <h2 className={`${styles.cardTitle} ${styles.danger}`}>
                Delete Account
            </h2>

            <div className={styles.inputGroup}>
                <InputLabel htmlFor="password">Password</InputLabel>
                <TextInput
                    type="password"
                    id="password"
                    name="password"
                    value={data.password}
                    onChange={(e) => setData("password", e.target.value)}
                />
                <InputError message={errors.password} />
            </div>

            <AdminButton
                type="submit"
                variant="delete"
                disabled={processing}
                className={"flex items-center justify-center gap-2"}
            >
                {processing ? (
                    <>
                        <Loader size="16px" /> Deleting...
                    </>
                ) : (
                    "Delete Account"
                )}
            </AdminButton>

            {recentlySuccessful && <InputSuccess message="Account deleted!" />}
        </form>
    );
}
