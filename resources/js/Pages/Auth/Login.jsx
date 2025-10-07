import { Link, useForm } from "@inertiajs/react";
import styles from "./Auth.module.css";
import TextInput from "@/Components/Form/TextInput/TextInput";
import Button from "@/Components/Form/Buttons/Button";
import Checkbox from "@/Components/Form/Checkbox/Checbox";
import FrontLayout from "@/Layouts/FrontLayout";

export default function Login() {
    const { data, setData, post, processing, errors } = useForm({
        email: "",
        password: "",
        remember: false,
    });

    const submit = (e) => {
        e.preventDefault();
        post(route("login"));
    };

    return (
        <section className={styles.authSection}>
            <div className={styles.container}>
                <div className={styles.leftPanel}>
                    <h2 className={styles.title}>New to our Shop?</h2>
                    <p className={styles.subtitle}>
                        There are advances being made in science and technology
                        everyday, and a good example of this is the
                    </p>
                    <Link
                        href={route("register")}
                        className={styles.linkButton}
                    >
                        Create an Account
                    </Link>
                </div>
                <div className={styles.rightPanel}>
                    <h2 className={styles.title}>
                        Welcome Back !<br />
                        Please sign in now
                    </h2>
                    <p className={styles.subtitle}>Please Sign in now</p>

                    <form onSubmit={submit} className={styles.form}>
                        <TextInput
                            type="email"
                            name="email"
                            placeholder="Email"
                            value={data.email}
                            onChange={(e) => setData("email", e.target.value)}
                        />

                        <TextInput
                            type="password"
                            name="password"
                            placeholder="Password"
                            value={data.password}
                            onChange={(e) =>
                                setData("password", e.target.value)
                            }
                        />

                        <Checkbox
                            checked={data.remember}
                            onChange={(e) =>
                                setData("remember", e.target.checked)
                            }
                            label="Remember me"
                        />

                        {errors.email && (
                            <small className={styles.error}>
                                {errors.email}
                            </small>
                        )}

                        <Button type="submit" disabled={processing}>
                            {processing ? "Logging in..." : "LOG IN"}
                        </Button>
                    </form>
                </div>
            </div>
        </section>
    );
}

Login.layout = (page) => <FrontLayout>{page}</FrontLayout>;
