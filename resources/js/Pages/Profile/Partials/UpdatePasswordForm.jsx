import { useForm } from "@inertiajs/react";
import InputLabel from "@/Components/Form/InputLabel/InputLabel";
import TextInput from "@/Components/Form/TextInput/TextInput";
import InputError from "@/Components/InputError";
import InputSuccess from "@/Components/InputSuccess";
import AdminButton from "@/Components/Buttons/AdminPage/AdminButton";
import Loader from "@/Components/Loader/Loader";
import styles from "../Edit.module.css";
import { formatUnderscore } from "@/utils/StringHelper";

export default function UpdatePasswordForm() {
    const {
        data,
        setData,
        put,
        errors,
        processing,
        reset,
        recentlySuccessful,
    } = useForm({
        current_password: "",
        password: "",
        password_confirmation: "",
    });

    const submit = (e) => {
        e.preventDefault();
        put(route("password.update"), {
            preserveScroll: true,
            preserveState: true,
            onSuccess: () => reset(),
        });
    };

    return (
        <form className={styles.card} onSubmit={submit}>
            <h2 className={styles.cardTitle}>Update Password</h2>

            {["current_password", "password", "password_confirmation"].map(
                (field) => (
                    <div key={field} className={styles.inputGroup}>
                        <InputLabel htmlFor={field}>
                            {formatUnderscore(field)}
                        </InputLabel>
                        <TextInput
                            id={field}
                            name={field}
                            type="password"
                            value={data[field]}
                            onChange={(e) => setData(field, e.target.value)}
                        />
                        <InputError message={errors[field]} />
                    </div>
                )
            )}

            <AdminButton
                type="submit"
                disabled={processing}
                className={"flex items-center justify-center gap-2"}
            >
                {processing ? (
                    <>
                        <Loader size="16px" color="black" /> Updating...
                    </>
                ) : (
                    "Update Password"
                )}
            </AdminButton>

            {recentlySuccessful && <InputSuccess message="Password updated!" />}
        </form>
    );
}
