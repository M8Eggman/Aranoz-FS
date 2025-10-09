import React from "react";
import { router, Link } from "@inertiajs/react";
import BackLayout from "@/Layouts/BackLayout";
import AdminButton from "@/Components/Buttons/AdminPage/AdminButton";
import styles from "./OrderShow.module.css";

export default function OrderShow({ order }) {
    const handleConfirm = () => {
        router.put(
            route("admin.orders.confirm", order.id),
            {},
            {
                preserveState: true,
                preserveScroll: true,
            }
        );
    };

    const handleArchive = () => {
        router.put(
            route("admin.orders.archive", order.id),
            {},
            {
                preserveState: true,
                preserveScroll: true,
            }
        );
    };

    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <h2 className={styles.title}>Order {order.order_number}</h2>
                <Link href={route("admin.orders")}>
                    <AdminButton variant="cancel">Back</AdminButton>
                </Link>
            </div>

            <div>
                <p className={styles.info}>
                    <strong>User:</strong> {order.user?.name || "Deleted User"}
                </p>
                <p className={styles.info}>
                    <strong>Status:</strong> {order.status}
                </p>
                <p className={styles.info}>
                    <strong>Archived:</strong> {order.isArchived ? "Yes" : "No"}
                </p>
                <p className={styles.info}>
                    <strong>Total:</strong> {order.total_price} €
                </p>
            </div>

            <div className={styles.buttons}>
                {order.status !== "confirmed" && (
                    <AdminButton onClick={handleConfirm}>
                        Confirm Order
                    </AdminButton>
                )}
                {!order.isArchived && (
                    <AdminButton onClick={handleArchive}>
                        Archive Order
                    </AdminButton>
                )}
            </div>

            <div className={styles.items}>
                <h3 className={styles.itemsTitle}>Items</h3>

                <ul className={styles.itemList}>
                    {order.order_items.map((item) => {
                        // Retourne un booléen si l'objet existe ou non
                        const productExists = !!item.product;
                        // Chemin de l'image si elle existe
                        const imageSrc = productExists
                            ? item?.product?.images_main?.offer
                            : "/storage/products/banner/TemplateB.png";

                        return (
                            <li
                                key={item.id}
                                className={`${styles.item} ${
                                    !productExists ? styles.deleted : ""
                                }`}
                            >
                                <img
                                    src={imageSrc}
                                    alt={
                                        productExists
                                            ? item.product.name
                                            : "Deleted Product"
                                    }
                                    className={styles.itemImage}
                                />
                                <div className={styles.itemInfo}>
                                    <div>
                                        <span className={styles.itemName}>
                                            {productExists
                                                ? item.product.name
                                                : `${item.product_name} (Deleted Product)`}
                                        </span>
                                        <span className={styles.itemQuantity}>
                                            × {item.quantity}
                                        </span>
                                    </div>
                                    <div className={styles.itemPrices}>
                                        <span className={styles.itemUnitPrice}>
                                            {parseFloat(
                                                item.product_price
                                            ).toFixed(2)}{" "}
                                            €
                                        </span>
                                        <span className={styles.itemTotalPrice}>
                                            {parseFloat(
                                                item.total_price
                                            ).toFixed(2)}{" "}
                                            €
                                        </span>
                                    </div>
                                </div>
                            </li>
                        );
                    })}
                </ul>

                <div className={styles.totalContainer}>
                    <span className={styles.totalLabel}>Final Total:</span>
                    <span className={styles.totalPrice}>
                        {parseFloat(order.total_price).toFixed(2)} €
                    </span>
                </div>
            </div>
        </div>
    );
}

OrderShow.layout = (page) => <BackLayout>{page}</BackLayout>;
