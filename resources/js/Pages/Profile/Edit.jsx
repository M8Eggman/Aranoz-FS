import { Head, usePage } from "@inertiajs/react";
import FrontLayout from "@/Layouts/FrontLayout";
import styles from "./Edit.module.css";
// Forms partials pour avoir un code plus propre et rendre la logique indépendante
import UpdateProfileForm from "./Partials/UpdateProfileForm";
import UpdatePasswordForm from "./Partials/UpdatePasswordForm";
import NewsletterForm from "./Partials/NewsletterForm";
import DeleteUserForm from "./Partials/DeleteUserForm";

export default function EditProfile({ status, subscribed }) {
    const user = usePage().props.auth?.user || {};

    return (
        <>
            <Head title="Profile" />
            <div className={styles.container}>
                <div className={styles.center}>
                    <UpdateProfileForm status={status} user={user} />
                    <NewsletterForm user={user} subscribed={subscribed} />
                    <UpdatePasswordForm />
                    <DeleteUserForm />
                </div>
            </div>
        </>
    );
}

EditProfile.layout = (page) => <FrontLayout>{page}</FrontLayout>;
