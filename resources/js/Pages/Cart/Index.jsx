import React from "react";
import { Link, router } from "@inertiajs/react";
import { usePage } from "@inertiajs/react";
import FrontLayout from "@/Layouts/FrontLayout";
import PublicHeader from "@/Components/Header/PublicHeader";
import QuantitySelector from "@/Components/Form/QuantitySelector/QuantitySelector";
import { FaTrash, FaArrowLeft } from "react-icons/fa";
import styles from "./Cart.module.css";
import { formatPrice } from "@/utils/StringHelper";

export default function Index({ cartItems = [], total = 0 }) {
    const { auth } = usePage().props;

    const handleQuantityChange = (itemId, newQuantity) => {
        router.patch(
            route("cart.update", itemId),
            {
                quantity: newQuantity,
            },
            {
                preserveScroll: true,
                preserveState: true,
            }
        );
    };

    const handleRemoveItem = (itemId) => {
        router.delete(route("cart.destroy", itemId), {
            preserveScroll: true,
            preserveState: true,
        });
    };

    const handleClearCart = () => {
        router.delete(route("cart.clear"), {
            preserveScroll: true,
            preserveState: true,
        });
    };

    if (!auth.user) {
        return (
            <>
                <PublicHeader title="Shopping Cart" subtitle="Home - Cart" />
                <section className={styles.wrapper}>
                    <div className={styles.container}>
                        <div className={styles.loginPrompt}>
                            <h2>Please log in to view your cart</h2>
                            <p>
                                You need to be logged in to access your shopping
                                cart.
                            </p>
                            <Link
                                href={route("login")}
                                className={styles.loginButton}
                            >
                                Log In
                            </Link>
                        </div>
                    </div>
                </section>
            </>
        );
    }

    return (
        <>
            <PublicHeader title="Shopping Cart" subtitle="Home - Cart" />
            <section className={styles.wrapper}>
                <div className={styles.container}>
                    {cartItems.length > 0 ? (
                        <>
                            <div className={styles.cartHeader}>
                                <h1 className={styles.cartTitle}>
                                    Shopping Cart
                                </h1>
                                <button
                                    className={styles.clearCartButton}
                                    onClick={handleClearCart}
                                >
                                    Clear Cart
                                </button>
                            </div>

                            <div className={styles.cartContent}>
                                <div className={styles.cartItems}>
                                    {cartItems.map((item) => (
                                        <div
                                            key={item.id}
                                            className={styles.cartItem}
                                        >
                                            <div className={styles.itemImage}>
                                                <img
                                                    src={
                                                        item.product
                                                            ?.images_main
                                                            ?.offer ||
                                                        "/storage/offer/templateP.png"
                                                    }
                                                    alt={
                                                        item.product?.name ||
                                                        "Product"
                                                    }
                                                />
                                            </div>

                                            <div className={styles.itemDetails}>
                                                <h3 className={styles.itemName}>
                                                    {item.product?.name ||
                                                        "Product"}
                                                </h3>
                                                <p
                                                    className={
                                                        styles.itemDescription
                                                    }
                                                >
                                                    {item.product
                                                        ?.description ||
                                                        "No description available"}
                                                </p>
                                                <div
                                                    className={styles.itemPrice}
                                                >
                                                    {formatPrice(
                                                        Number(
                                                            item.product
                                                                ?.final_price ||
                                                                0
                                                        )
                                                    )}
                                                </div>
                                            </div>

                                            <div
                                                className={styles.itemQuantity}
                                            >
                                                <QuantitySelector
                                                    value={item.quantity}
                                                    onChange={(newQuantity) =>
                                                        handleQuantityChange(
                                                            item.id,
                                                            newQuantity
                                                        )
                                                    }
                                                    min={1}
                                                    max={item.product.stock}
                                                />
                                            </div>

                                            <div className={styles.itemTotal}>
                                                <span
                                                    className={
                                                        styles.totalPrice
                                                    }
                                                >
                                                    {formatPrice(
                                                        Number(
                                                            item.product
                                                                .final_price
                                                        ) * item.quantity
                                                    )}
                                                </span>
                                            </div>

                                            <div className={styles.itemActions}>
                                                <button
                                                    className={
                                                        styles.removeButton
                                                    }
                                                    onClick={() =>
                                                        handleRemoveItem(
                                                            item.id
                                                        )
                                                    }
                                                    aria-label="Remove item"
                                                >
                                                    <FaTrash />
                                                </button>
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                <div className={styles.cartSummary}>
                                    <div className={styles.summaryCard}>
                                        <h3 className={styles.summaryTitle}>
                                            Order Summary
                                        </h3>

                                        <div className={styles.summaryRow}>
                                            <span>Subtotal:</span>
                                            <span>{formatPrice(total)}</span>
                                        </div>

                                        <div className={styles.summaryRow}>
                                            <span>Shipping:</span>
                                            <span>Free</span>
                                        </div>

                                        <div className={styles.summaryRow}>
                                            <span>Tax:</span>
                                            <span>
                                                {formatPrice(total * 0.1)}
                                            </span>
                                        </div>

                                        <div
                                            className={styles.summaryDivider}
                                        ></div>

                                        <div className={styles.summaryRow}>
                                            <span className={styles.totalLabel}>
                                                Total:
                                            </span>
                                            <span
                                                className={styles.totalAmount}
                                            >
                                                {formatPrice(total * 1.1)}
                                            </span>
                                        </div>

                                        <div className={styles.summaryActions}>
                                            <Link
                                                href={route("checkout")}
                                                className={
                                                    styles.checkoutButton
                                                }
                                            >
                                                Proceed to Checkout
                                            </Link>
                                            <Link
                                                href={route("products")}
                                                className={
                                                    styles.continueShoppingButton
                                                }
                                            >
                                                <FaArrowLeft />
                                                Continue Shopping
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </>
                    ) : (
                        <div className={styles.emptyCart}>
                            <div className={styles.emptyCartContent}>
                                <h2>Your cart is empty</h2>
                                <p>
                                    Looks like you haven't added any items to
                                    your cart yet.
                                </p>
                                <Link
                                    href={route("products")}
                                    className={styles.shopButton}
                                >
                                    Start Shopping
                                </Link>
                            </div>
                        </div>
                    )}
                </div>
            </section>
        </>
    );
}

Index.layout = (page) => <FrontLayout>{page}</FrontLayout>;
