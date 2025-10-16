import React, { useState } from "react";
import { router, useForm, usePage } from "@inertiajs/react";
import FrontLayout from "@/Layouts/FrontLayout";
import PublicHeader from "@/Components/Header/PublicHeader";
import { FaCreditCard, FaPaypal, FaCheck } from "react-icons/fa";
import styles from "./Checkout.module.css";
import Button from "@/Components/Form/Buttons/Button";
import FlashMessage from "@/Components/FlashMessage/FlashMessage";

export default function Checkout({
    cartItems,
    countries,
    subtotal,
    discount,
    finalTotal,
    billingDetail,
}) {
    const user = usePage().props.auth?.user || {};

    const [paymentMethod, setPaymentMethod] = useState("check_payments");
    const [acceptTerms, setAcceptTerms] = useState(false);

    const { data, setData, post, processing, errors } = useForm({
        first_name: billingDetail?.first_name || "",
        last_name: billingDetail?.last_name || "",
        company: billingDetail?.company || "",
        phone_number: billingDetail?.phone_number || "",
        email: user.email || "",
        country_id: billingDetail?.country_id || "",
        address: billingDetail?.address || "",
        number: billingDetail?.number || "",
        city: billingDetail?.city || "",
        zip: billingDetail?.zip || "",
        payment_method: paymentMethod,
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!acceptTerms) {
            alert("Please accept the terms & conditions");
            return;
        }

        post(route("checkout.process"), {
            preserveScroll: true,
            preserveState: true,
        });
    };

    const handlePaymentMethodChange = (method) => {
        setPaymentMethod(method);
        setData("payment_method", method);
    };

    return (
        <>
            <PublicHeader title="Checkout" subtitle="Home - Checkout" />
            <section className={styles.wrapper}>
                <div className={styles.container}>
                    <form
                        onSubmit={handleSubmit}
                        className={styles.checkoutForm}
                    >
                        {/* Left Column - Billing Details */}
                        <div className={styles.leftColumn}>
                            {/* Billing Details */}
                            <div className={styles.billingSection}>
                                <h2 className={styles.sectionTitle}>
                                    Billing Details
                                </h2>

                                <div className={styles.formRow}>
                                    <div className={styles.formGroup}>
                                        <input
                                            type="text"
                                            placeholder="First Name"
                                            value={data.first_name}
                                            onChange={(e) =>
                                                setData(
                                                    "first_name",
                                                    e.target.value
                                                )
                                            }
                                            className={styles.formInput}
                                        />
                                        {errors.first_name && (
                                            <span className={styles.error}>
                                                {errors.first_name}
                                            </span>
                                        )}
                                    </div>
                                    <div className={styles.formGroup}>
                                        <input
                                            type="text"
                                            placeholder="Last Name"
                                            value={data.last_name}
                                            onChange={(e) =>
                                                setData(
                                                    "last_name",
                                                    e.target.value
                                                )
                                            }
                                            className={styles.formInput}
                                        />
                                        {errors.last_name && (
                                            <span className={styles.error}>
                                                {errors.last_name}
                                            </span>
                                        )}
                                    </div>
                                </div>

                                <div className={styles.formGroup}>
                                    <input
                                        type="text"
                                        placeholder="Company"
                                        value={data.company}
                                        onChange={(e) =>
                                            setData("company", e.target.value)
                                        }
                                        className={styles.formInput}
                                    />
                                </div>

                                <div className={styles.formRow}>
                                    <div className={styles.formGroup}>
                                        <input
                                            type="tel"
                                            placeholder="Phone Number"
                                            value={data.phone_number}
                                            onChange={(e) =>
                                                setData(
                                                    "phone_number",
                                                    e.target.value
                                                )
                                            }
                                            className={styles.formInput}
                                        />
                                        {errors.phone_number && (
                                            <span className={styles.error}>
                                                {errors.phone_number}
                                            </span>
                                        )}
                                    </div>
                                    <div className={styles.formGroup}>
                                        <input
                                            type="email"
                                            placeholder="Email Address"
                                            value={data.email}
                                            onChange={(e) =>
                                                setData("email", e.target.value)
                                            }
                                            className={styles.formInput}
                                        />
                                        {errors.email && (
                                            <span className={styles.error}>
                                                {errors.email}
                                            </span>
                                        )}
                                    </div>
                                </div>

                                <div className={styles.formGroup}>
                                    <select
                                        value={data.country_id}
                                        onChange={(e) =>
                                            setData(
                                                "country_id",
                                                e.target.value
                                            )
                                        }
                                        className={styles.formSelect}
                                    >
                                        {countries.map((country) => (
                                            <option
                                                key={country.id}
                                                value={country.id}
                                            >
                                                {country.name}
                                            </option>
                                        ))}
                                    </select>
                                    {errors.country_id && (
                                        <span className={styles.error}>
                                            {errors.country_id}
                                        </span>
                                    )}
                                </div>

                                <div className={styles.formRow}>
                                    <div className={styles.formGroup}>
                                        <input
                                            type="text"
                                            placeholder="Address"
                                            value={data.address}
                                            onChange={(e) =>
                                                setData(
                                                    "address",
                                                    e.target.value
                                                )
                                            }
                                            className={styles.formInput}
                                        />
                                        {errors.address && (
                                            <span className={styles.error}>
                                                {errors.address}
                                            </span>
                                        )}
                                    </div>
                                    <div className={styles.formGroup}>
                                        <input
                                            type="text"
                                            placeholder="Number"
                                            value={data.number}
                                            onChange={(e) =>
                                                setData(
                                                    "number",
                                                    e.target.value
                                                )
                                            }
                                            className={styles.formInput}
                                        />
                                        {errors.number && (
                                            <span className={styles.error}>
                                                {errors.number}
                                            </span>
                                        )}
                                    </div>
                                </div>

                                <div className={styles.formRow}>
                                    <div className={styles.formGroup}>
                                        <input
                                            type="text"
                                            placeholder="City"
                                            value={data.city}
                                            onChange={(e) =>
                                                setData("city", e.target.value)
                                            }
                                            className={styles.formInput}
                                        />
                                        {errors.city && (
                                            <span className={styles.error}>
                                                {errors.city}
                                            </span>
                                        )}
                                    </div>
                                    <div className={styles.formGroup}>
                                        <input
                                            type="text"
                                            placeholder="Postcode/ZIP"
                                            value={data.zip}
                                            onChange={(e) =>
                                                setData("zip", e.target.value)
                                            }
                                            className={styles.formInput}
                                        />
                                        {errors.zip && (
                                            <span className={styles.error}>
                                                {errors.zip}
                                            </span>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Right Column - Order Summary & Payment */}
                        <div className={styles.rightColumn}>
                            {/* Your Order */}
                            <div className={styles.orderSection}>
                                <h2 className={styles.sectionTitle}>
                                    Your Order
                                </h2>

                                <div className={styles.orderItems}>
                                    {cartItems.map((item) => (
                                        <div
                                            key={item.id}
                                            className={styles.orderItem}
                                        >
                                            <span className={styles.itemName}>
                                                {item.product.name} x{" "}
                                                {item.quantity}
                                            </span>
                                            <span className={styles.itemPrice}>
                                                $
                                                {item.product.final_price *
                                                    item.quantity}
                                            </span>
                                        </div>
                                    ))}
                                </div>

                                <div className={styles.orderSummary}>
                                    <div className={styles.summaryRow}>
                                        <span>SUBTOTAL</span>
                                        <span>${subtotal.toFixed(2)}</span>
                                    </div>
                                    {discount > 0 && (
                                        <div className={styles.summaryRow}>
                                            <span>DISCOUNT</span>
                                            <span
                                                className={styles.discountText}
                                            >
                                                -${discount.toFixed(2)}
                                            </span>
                                        </div>
                                    )}
                                    <div className={styles.summaryRow}>
                                        <span>SHIPPING</span>
                                        <span className={styles.freeShipping}>
                                            FREE SHIPPING WORLD WIDE !
                                        </span>
                                    </div>
                                    <div className={styles.summaryRow}>
                                        <span>TOTAL</span>
                                        <span>${finalTotal.toFixed(2)}</span>
                                    </div>
                                </div>
                            </div>

                            {/* Payment Method */}
                            <div className={styles.paymentSection}>
                                <h2 className={styles.sectionTitle}>
                                    Payment Method
                                </h2>

                                <div className={styles.paymentOptions}>
                                    <div className={styles.paymentOption}>
                                        <input
                                            type="radio"
                                            id="check_payments"
                                            name="payment_method"
                                            value="check_payments"
                                            checked={
                                                paymentMethod ===
                                                "check_payments"
                                            }
                                            onChange={() =>
                                                handlePaymentMethodChange(
                                                    "check_payments"
                                                )
                                            }
                                            className={styles.radioInput}
                                        />
                                        <label
                                            htmlFor="check_payments"
                                            className={styles.paymentLabel}
                                        >
                                            <FaCheck
                                                className={styles.paymentIcon}
                                            />
                                            CHECK PAYMENTS
                                        </label>
                                    </div>

                                    <div className={styles.paymentOption}>
                                        <input
                                            type="radio"
                                            id="paypal"
                                            name="payment_method"
                                            value="paypal"
                                            checked={paymentMethod === "paypal"}
                                            onChange={() =>
                                                handlePaymentMethodChange(
                                                    "paypal"
                                                )
                                            }
                                            className={styles.radioInput}
                                        />
                                        <label
                                            htmlFor="paypal"
                                            className={styles.paymentLabel}
                                        >
                                            <FaPaypal
                                                className={styles.paymentIcon}
                                            />
                                            PAYPAL
                                        </label>
                                    </div>
                                </div>

                                {paymentMethod === "check" && (
                                    <div className={styles.paymentInstructions}>
                                        Please send a check to Store Name, Store
                                        Street, Store Town, Store State /
                                        County, Store Postcode.
                                    </div>
                                )}

                                <div className={styles.termsSection}>
                                    <label className={styles.termsLabel}>
                                        <input
                                            type="checkbox"
                                            checked={acceptTerms}
                                            onChange={(e) =>
                                                setAcceptTerms(e.target.checked)
                                            }
                                            className={styles.checkboxInput}
                                        />
                                        I've read and accept the{" "}
                                        <span className={styles.termsLink}>
                                            terms & conditions
                                        </span>
                                        *
                                    </label>
                                </div>

                                <Button
                                    type="submit"
                                    disabled={processing}
                                    className={styles.checkoutButton}
                                >
                                    {processing
                                        ? "PROCESSING..."
                                        : "CHECK AND PAY"}
                                </Button>
                            </div>
                        </div>
                    </form>
                </div>
            </section>
        </>
    );
}

Checkout.layout = (page) => <FrontLayout>{page}</FrontLayout>;
