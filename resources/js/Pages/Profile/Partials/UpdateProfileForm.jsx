import { useForm } from "@inertiajs/react";
import InputLabel from "@/Components/Form/InputLabel/InputLabel";
import TextInput from "@/Components/Form/TextInput/TextInput";
import InputError from "@/Components/InputError";
import InputSuccess from "@/Components/InputSuccess";
import AdminButton from "@/Components/Buttons/AdminPage/AdminButton";
import Loader from "@/Components/Loader/Loader";
import styles from "../Edit.module.css";
import { useEffect, useMemo, useRef } from "react";

export default function UpdateProfileForm({ status, user }) {
    // Ref pour le input de fichier
    const fileInputRef = useRef(null);

    const { data, setData, post, errors, processing, recentlySuccessful } =
        useForm({
            name: user.name || "",
            email: user.email || "",
            image_file: null,
            image_url: "",
        });

    // Revoke Object URL pour éviter les fuites de mémoire lors du démontage du composant
    useEffect(() => {
        return () => data.image_file && URL.revokeObjectURL(data.image_file);
    }, [data.image_file]);

    // URL de l'image pour le preview de l'image
    const src = useMemo(() => {
        if (data.image_file) return URL.createObjectURL(data.image_file);
        if (data.image_url?.trim()) return data.image_url;
        if (user.images?.medium) return user.images.medium;
        return "/storage/users/templateU.png";
    }, [data.image_file, data.image_url, user]);

    // Handle change du fichier
    function handleFileChange(e) {
        const file = e.target.files[0];
        if (file)
            setData({
                ...data,
                image_file: file,
                image_url: "",
            });
    }

    // Handle change de l'URL
    function handleUrlChange(e) {
        setData({
            ...data,
            image_file: null,
            image_url: e.target.value,
        });
        if (fileInputRef.current) fileInputRef.current.value = "";
    }

    // Submit du formulaire
    function submit(e) {
        e.preventDefault();
        post(route("profile.update"), {
            _method: "patch",
            preserveScroll: true,
            preserveState: true,
            forceFormData: true,
            onSuccess: () => {
                if (fileInputRef.current) fileInputRef.current.value = "";
            },
        });
    }

    return (
        <form className={styles.card} onSubmit={submit}>
            <h2 className={styles.cardTitle}>Profile Information</h2>

            {/* Name */}
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

            {/* Email */}
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

            {/* Image upload */}
            <div className={styles.inputGroup}>
                <InputLabel htmlFor="profile-image">Profile Image</InputLabel>
                <div className={styles.inputImage}>
                    <div className={styles.imageUpload}>
                        <div className={styles.imagePreviewWrapper}>
                            <img
                                src={src}
                                alt="Profile preview"
                                className={styles.imagePreview}
                            />
                        </div>
                        <input
                            ref={fileInputRef}
                            type="file"
                            id="profile-image"
                            name="image_file"
                            accept="image/*"
                            onChange={handleFileChange}
                            className={styles.fileInput}
                            disabled={processing}
                        />
                    </div>
                    <p className={styles.disclaimer}>
                        Disclaimer : Max 2mo size image !
                    </p>
                </div>

                <InputError message={errors.image_file} />
            </div>

            {/* Image URL */}
            <div className={styles.inputGroup}>
                <InputLabel htmlFor="image_url">
                    Or paste image URL here
                </InputLabel>
                <TextInput
                    id="image_url"
                    name="image_url"
                    type="url"
                    value={data.image_url}
                    onChange={handleUrlChange}
                    placeholder="https://example.com/image.jpg"
                    disabled={processing}
                />
                <InputError message={errors.image_url} />
            </div>

            {/* Submit button */}
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
