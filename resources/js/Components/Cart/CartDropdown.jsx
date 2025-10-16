import React, { useState, useRef, useEffect } from "react";
import { Link } from "@inertiajs/react";
import { usePage } from "@inertiajs/react";
import { FaShoppingCart, FaTrash } from "react-icons/fa";
import styles from "./CartDropdown.module.css";
import { formatPrice } from "@/utils/StringHelper";

export default function CartDropdown() {
    const { auth } = usePage().props;
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef(null);

    // Fermer le dropdown si on clique à l'extérieur
    useEffect(() => {
        function handleClickOutside(event) {
            if (
                dropdownRef.current &&
                !dropdownRef.current.contains(event.target)
            ) {
                setIsOpen(false);
            }
        }

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    const cartItems = usePage().props.auth?.user?.carts || [];

    const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);
    const totalPrice = cartItems.reduce(
        (sum, item) => sum + Number(item.product.final_price) * item.quantity,
        0
    );

    const handleRemoveItem = (itemId) => {
        // Logique pour supprimer un article du panier
        console.log("Remove item:", itemId);
    };

    if (!auth.user) {
        return null; // Ne pas afficher le panier si l'utilisateur n'est pas connecté
    }

    return (
        <div className={styles.cartDropdown} ref={dropdownRef}>
            <button
                className={styles.cartButton}
                onClick={() => setIsOpen(!isOpen)}
            >
                <FaShoppingCart className={styles.cartIcon} />
                {totalItems > 0 && (
                    <span className={styles.cartBadge}>{totalItems}</span>
                )}
            </button>

            {isOpen && (
                <div className={styles.dropdownContent}>
                    <div className={styles.dropdownHeader}>
                        <h3 className={styles.cartTitle}>Shopping Cart</h3>
                        <span className={styles.itemCount}>
                            {totalItems} items
                        </span>
                    </div>

                    <div className={styles.cartItems}>
                        {cartItems.length > 0 ? (
                            cartItems.map((item) => (
                                <div key={item.id} className={styles.cartItem}>
                                    <div className={styles.itemImage}>
                                        <img
                                            src={
                                                item.product.images_main
                                                    ?.offer ||
                                                "/storage/offer/templateP.png"
                                            }
                                            alt={item.product.name}
                                        />
                                    </div>
                                    <div className={styles.itemDetails}>
                                        <h4 className={styles.itemName}>
                                            {item.product.name}
                                        </h4>
                                        <div className={styles.itemInfo}>
                                            <span className={styles.itemPrice}>
                                                {formatPrice(
                                                    Number(
                                                        item.product.final_price
                                                    )
                                                )}
                                            </span>
                                            <span
                                                className={styles.itemQuantity}
                                            >
                                                Qty: {item.quantity}
                                            </span>
                                        </div>
                                    </div>
                                    <button
                                        className={styles.removeButton}
                                        onClick={() =>
                                            handleRemoveItem(item.id)
                                        }
                                    >
                                        <FaTrash />
                                    </button>
                                </div>
                            ))
                        ) : (
                            <div className={styles.emptyCart}>
                                <p>Your cart is empty</p>
                            </div>
                        )}
                    </div>

                    {cartItems.length > 0 && (
                        <div className={styles.cartFooter}>
                            <div className={styles.cartTotal}>
                                <span className={styles.totalLabel}>
                                    Total:
                                </span>
                                <span className={styles.totalPrice}>
                                    {formatPrice(totalPrice)}
                                </span>
                            </div>
                            <div className={styles.cartActions}>
                                <Link
                                    href={route("cart.index")}
                                    className={styles.viewCartButton}
                                    onClick={() => setIsOpen(false)}
                                >
                                    View Cart
                                </Link>
                                <Link
                                    href="#"
                                    className={styles.checkoutButton}
                                    onClick={() => setIsOpen(false)}
                                >
                                    Checkout
                                </Link>
                            </div>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}
