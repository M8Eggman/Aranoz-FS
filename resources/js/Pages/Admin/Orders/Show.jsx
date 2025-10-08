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
                <h3 className="text-lg font-semibold">Items</h3>
                <ul>
                    {order.order_items.map((item) => (
                        <li key={item.id} className={styles.item}>
                            {item.product_name} — {item.quantity} ×{" "}
                            {item.product_price} €
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}

OrderShow.layout = (page) => <BackLayout>{page}</BackLayout>;
