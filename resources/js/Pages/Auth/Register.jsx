import { Link, useForm } from "@inertiajs/react";
import styles from "./Auth.module.css";
import TextInput from "@/Components/Form/TextInput/TextInput";
import Button from "@/Components/Form/Buttons/Button";
import Checkbox from "@/Components/Form/Checkbox/Checbox";
import FrontLayout from "@/Layouts/FrontLayout";

export default function Register() {
    const { data, setData, post, processing, errors } = useForm({
        name: "",
        email: "",
        image_file: null,
        image_url: "",
        password: "",
        password_confirmation: "",
        newsletter: false,
    });

    function submit(e) {
        e.preventDefault();
        post(route("register"));
    }

    function getPreview() {
        if (data.image_file) {
            return URL.createObjectURL(data.image_file);
        } else if (data.image_url?.trim() !== "") {
            return data.image_url;
        } else {
            return "/storage/users/templateU.png";
        }
    }

    return (
        <section className={styles.authSection}>
            <div className={styles.container}>
                <div className={styles.rightPanel}>
                    <h2 className={styles.title}>
                        Welcome !<br />
                        Please register now
                    </h2>

                    <form onSubmit={submit} className={styles.form}>
                        <div className={styles.inputGroup}>
                            <TextInput
                                type="text"
                                name="name"
                                placeholder="Username"
                                value={data.name}
                                onChange={(e) =>
                                    setData("name", e.target.value)
                                }
                            />
                            {errors.name && (
                                <p className="errorText">{errors.name}</p>
                            )}
                        </div>

                        <div className={styles.inputGroup}>
                            <TextInput
                                type="email"
                                name="email"
                                placeholder="Email"
                                value={data.email}
                                onChange={(e) =>
                                    setData("email", e.target.value)
                                }
                            />
                            {errors.email && (
                                <p className="errorText">{errors.email}</p>
                            )}
                        </div>

                        <div className={styles.inputImage}>
                            <div className={styles.imageUpload}>
                                <div className={styles.imagePreviewWrapper}>
                                    <img
                                        src={getPreview()}
                                        alt=""
                                        className={styles.imagePreview}
                                    />
                                </div>

                                <input
                                    type="file"
                                    name="image_file"
                                    accept="image/*"
                                    onChange={(e) => {
                                        setData(
                                            "image_file",
                                            e.target.files[0]
                                        );
                                    }}
                                    className={styles.fileInput}
                                />
                            </div>

                            <p className={styles.disclaimer}>
                                Disclaimer : Max 2mo size image !
                            </p>
                        </div>

                        <TextInput
                            type="url"
                            name="image_url"
                            placeholder="Or paste image URL here"
                            value={data.image_url}
                            onChange={(e) => {
                                setData("image_file", null);
                                setData("image_url", e.target.value);
                            }}
                        />

                        <div className={styles.inputGroup}>
                            <TextInput
                                type="password"
                                name="password"
                                placeholder="Password"
                                value={data.password}
                                onChange={(e) =>
                                    setData("password", e.target.value)
                                }
                            />
                            {errors.password && (
                                <p className="errorText">{errors.password}</p>
                            )}
                        </div>

                        <div className={styles.inputGroup}>
                            <TextInput
                                type="password"
                                name="password_confirmation"
                                placeholder="Confirm Password"
                                value={data.password_confirmation}
                                onChange={(e) =>
                                    setData(
                                        "password_confirmation",
                                        e.target.value
                                    )
                                }
                            />
                            {errors.password_confirmation && (
                                <p className="errorText">
                                    {errors.password_confirmation}
                                </p>
                            )}
                        </div>

                        <Checkbox
                            name="newsletter"
                            checked={data.newsletter}
                            onChange={(e) =>
                                setData("newsletter", e.target.checked)
                            }
                            label="Subscribe to newsletter"
                        />

                        <Button type="submit" disabled={processing}>
                            {processing ? "Creating account..." : "SIGN UP"}
                        </Button>
                    </form>
                </div>

                <div className={styles.leftPanel}>
                    <h2 className={styles.title}>
                        You are new ? <br />
                        Create new account here
                    </h2>
                    <p className={styles.subtitle}>
                        There are advances being made in science and technology
                        everyday, and a good example of this is the
                    </p>
                    <Link href={route("login")} className={styles.linkButton}>
                        Go to Login
                    </Link>
                </div>
            </div>
        </section>
    );
}

Register.layout = (page) => <FrontLayout>{page}</FrontLayout>;
