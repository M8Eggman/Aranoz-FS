import { FaHome, FaPhone, FaEnvelope } from "react-icons/fa";
import styles from "./ContactInfo.module.css";
import Button from "@/Components/Form/Buttons/Button";
import TextInput from "@/Components/Form/TextInput/TextInput";
import BackLayout from "@/Layouts/BackLayout";
import { useForm, usePage } from "@inertiajs/react";
import AdminHeader from "../../../Components/Header/AdminHeader";
import { useEffect } from "react";
import FlashMessage from "@/Components/FlashMessage/FlashMessage";

export default function ContactInfo({ contactInfo }) {
    const { flash } = usePage().props;

    const { data, setData, put, processing, errors } = useForm({
        street: contactInfo.street || "",
        state: contactInfo.state || "",
        city: contactInfo.city || "",
        country_code: contactInfo.country_code || "",
        zip_code: contactInfo.zip_code || "",
        number: contactInfo.number || "",
        email: contactInfo.email || "",
        phone_number: contactInfo.phone_number || "",
    });

    function handleChange(e) {
        setData(e.target.name, e.target.value);
    }

    function handleSubmit(e) {
        e.preventDefault();
        put(route("contact.info.update"), {
            preserveScroll: true,
            preserveState: true,
        });
    }

    useEffect(() => {
        console.log(flash?.success);
        console.log(errors);
    }, [flash, errors]);

    return (
        <>
            <AdminHeader title="Contact Settings" />
            <div className={styles.container}>
                <div className={styles.map}>
                    <iframe
                        src={`https://www.google.com/maps?q=${encodeURIComponent(
                            `${data.number} ${data.street}, ${data.zip_code} ${data.city}, ${data.country_code}`
                        )}&output=embed`}
                        title="Map"
                        className={styles.iframe}
                        allowFullScreen
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                    />
                </div>

                <h2 className={styles.title}>Update your contact data</h2>

                <FlashMessage />

                <div className={styles.formWrapper}>
                    <form className={styles.form} onSubmit={handleSubmit}>
                        <div className={styles.row}>
                            <div className={styles.inputGroup}>
                                <FaHome className={styles.icon} />
                                <div className={styles.input}>
                                    <TextInput
                                        name="street"
                                        placeholder="Street"
                                        value={data.street}
                                        onChange={handleChange}
                                        className={styles.input}
                                    />
                                    {errors.street && (
                                        <p className="errorText">
                                            {errors.street}
                                        </p>
                                    )}
                                </div>
                            </div>

                            <div className={styles.input}>
                                <TextInput
                                    name="state"
                                    placeholder="State"
                                    value={data.state}
                                    onChange={handleChange}
                                    className={styles.input}
                                />
                                {errors.state && (
                                    <p className="errorText">{errors.state}</p>
                                )}
                            </div>

                            <div className={styles.input}>
                                <TextInput
                                    name="city"
                                    placeholder="City"
                                    value={data.city}
                                    onChange={handleChange}
                                    className={styles.input}
                                />
                                {errors.city && (
                                    <p className="errorText">{errors.city}</p>
                                )}
                            </div>
                        </div>

                        <div className={styles.row}>
                            <div className={styles.inputGroup}>
                                <FaHome className={styles.icon} />
                                <div className={styles.input}>
                                    <TextInput
                                        name="country_code"
                                        placeholder="Country code"
                                        value={data.country_code}
                                        onChange={handleChange}
                                        className={styles.input}
                                    />
                                    {errors.country_code && (
                                        <p className="errorText">
                                            {errors.country_code}
                                        </p>
                                    )}
                                </div>
                            </div>

                            <div className={styles.input}>
                                <TextInput
                                    name="zip_code"
                                    placeholder="Zip code"
                                    value={data.zip_code}
                                    onChange={handleChange}
                                    className={styles.input}
                                />
                                {errors.zip_code && (
                                    <p className="errorText">
                                        {errors.zip_code}
                                    </p>
                                )}
                            </div>

                            <div className={styles.input}>
                                <TextInput
                                    name="number"
                                    placeholder="Number"
                                    value={data.number}
                                    onChange={handleChange}
                                    className={styles.input}
                                />
                                {errors.number && (
                                    <p className="errorText">{errors.number}</p>
                                )}
                            </div>
                        </div>

                        <div className={styles.row}>
                            <div className={styles.inputGroup}>
                                <FaEnvelope className={styles.icon} />
                                <div className={styles.input}>
                                    <TextInput
                                        name="email"
                                        placeholder="Email"
                                        value={data.email}
                                        onChange={handleChange}
                                        className={styles.input}
                                    />
                                    {errors.email && (
                                        <p className="errorText">
                                            {errors.email}
                                        </p>
                                    )}
                                </div>
                            </div>

                            <div className={styles.inputGroup}>
                                <FaPhone className={styles.icon} />
                                <div className={styles.input}>
                                    <TextInput
                                        name="phone_number"
                                        placeholder="Phone number"
                                        value={data.phone_number}
                                        onChange={handleChange}
                                        className={styles.input}
                                    />
                                    {errors.phone_number && (
                                        <p className="errorText">
                                            {errors.phone_number}
                                        </p>
                                    )}
                                </div>
                            </div>
                        </div>

                        <Button
                            type="submit"
                            className={styles.button}
                            disabled={processing}
                        >
                            {processing ? "Updating..." : "UPDATE CONTACT"}
                        </Button>
                    </form>

                    <div className={styles.info}>
                        <div className={styles.infoRow}>
                            <FaHome className={styles.infoIcon} />
                            <div>
                                <p className={styles.infoTitle}>
                                    {data.number}, {data.street}
                                </p>
                                <p>
                                    {data.city}, {data.zip_code}
                                </p>
                            </div>
                        </div>

                        <div className={styles.infoRow}>
                            <FaPhone className={styles.infoIcon} />
                            <div>
                                <p className={styles.infoTitle}>
                                    {data.phone_number}
                                </p>
                                <p>Mon to Fri 9am to 6pm</p>
                            </div>
                        </div>

                        <div className={styles.infoRow}>
                            <FaEnvelope className={styles.infoIcon} />
                            <div>
                                <p className={styles.infoTitle}>{data.email}</p>
                                <p>Send us your query anytime!</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

ContactInfo.layout = (page) => <BackLayout>{page}</BackLayout>;
