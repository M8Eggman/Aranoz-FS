import { useForm } from "@inertiajs/react";
import InputLabel from "@/Components/Form/InputLabel/InputLabel";
import TextInput from "@/Components/Form/TextInput/TextInput";
import InputError from "@/Components/InputError";
import InputSuccess from "@/Components/InputSuccess";
import AdminButton from "@/Components/Buttons/AdminPage/AdminButton";
import Loader from "@/Components/Loader/Loader";
import styles from "../Edit.module.css";

export default function UpdateProfileForm({ status, user }) {
    const { data, setData, patch, errors, processing, recentlySuccessful } =
        useForm({
            name: user.name || "",
            email: user.email || "",
        });

    const submit = (e) => {
        e.preventDefault();
        patch(route("profile.update"), {
            preserveScroll: true,
            preserveState: true,
        });
    };

    return (
        <form className={styles.card} onSubmit={submit}>
            <h2 className={styles.cardTitle}>Profile Information</h2>

            <div className={styles.inputGroup}>
                <InputLabel htmlFor="name">Name</InputLabel>
                <TextInput
                    id="name"
                    name="name"
                    value={data.name}
                    onChange={(e) => setData("name", e.target.value)}
                    autoComplete="name"
                />
                <InputError message={errors.name} />
            </div>

            <div className={styles.inputGroup}>
                <InputLabel htmlFor="email">Email</InputLabel>
                <TextInput
                    id="email"
                    name="email"
                    type="email"
                    value={data.email}
                    onChange={(e) => setData("email", e.target.value)}
                    autoComplete="email"
                />
                <InputError message={errors.email} />
            </div>

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
                    "Update Profile"
                )}
            </AdminButton>

            {(status || recentlySuccessful) && (
                <InputSuccess message={status || "Profile updated!"} />
            )}
        </form>
    );
}
