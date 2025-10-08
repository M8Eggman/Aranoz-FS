import React from "react";
import { router } from "@inertiajs/react";
import BackLayout from "@/Layouts/BackLayout";
import FlashMessage from "@/Components/FlashMessage/FlashMessage";
import AdminButton from "@/Components/Buttons/AdminPage/AdminButton";
import AdminHeader from "../partials/Header/AdminHeader";
import styles from "../partials/AdminTable/AdminTable.module.css";

export default function Orders({ orders, status }) {
    const handleConfirm = (id) => {
        router.put(route("admin.orders.confirm", id), {
            preserveState: true,
            preserveScroll: true,
        });
    };

    const handleArchive = (id) => {
        router.put(route("admin.orders.archive", id), {
            preserveState: true,
            preserveScroll: true,
        });
    };

    return (
        <>
            <AdminHeader title="Orders" />
            <section className={styles.container}>
                <FlashMessage />

                {orders.length === 0 ? (
                    <p>No orders {status || ""} found.</p>
                ) : (
                    <table className={styles.table}>
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Order Number</th>
                                <th>User</th>
                                <th>Total</th>
                                <th>Status</th>
                                <th>Archived</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {orders.map((order) => (
                                <tr key={order.id}>
                                    <td>{order.id}</td>
                                    <td>{order.order_number}</td>
                                    <td
                                        className={
                                            order.user
                                                ? ""
                                                : "text-gray-400 italic"
                                        }
                                    >
                                        {order.user?.name || "Deleted User"}
                                    </td>
                                    <td>
                                        {parseInt(order.total_price).toFixed(2)}{" "}
                                        €
                                    </td>
                                    <td>{order.status}</td>
                                    <td>{order.isArchived ? "Yes" : "No"}</td>
                                    <td className={styles.actions}>
                                        {order.status === "pending" &&
                                            !order.isArchived && (
                                                <AdminButton
                                                    onClick={() =>
                                                        handleConfirm(order.id)
                                                    }
                                                >
                                                    Confirm
                                                </AdminButton>
                                            )}
                                        {!order.isArchived && (
                                            <AdminButton
                                                onClick={() =>
                                                    handleArchive(order.id)
                                                }
                                                variant="delete"
                                            >
                                                Archive
                                            </AdminButton>
                                        )}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </section>
        </>
    );
}

Orders.layout = (page) => <BackLayout>{page}</BackLayout>;
