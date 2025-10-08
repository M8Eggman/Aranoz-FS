import React from "react";
import { Link, router, usePage } from "@inertiajs/react";
import BackLayout from "@/Layouts/BackLayout";
import FlashMessage from "@/Components/FlashMessage/FlashMessage";
import AdminButton from "@/Components/Buttons/AdminPage/AdminButton";
import AdminHeader from "../partials/Header/AdminHeader";
import styles from "../partials/AdminTable/AdminTable.module.css";

export default function Orders({ orders, status }) {
    const statuses = ["pending", "confirmed", "archived", "all"];

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

    const changeStatus = (newStatus) => {
        router.get(route("admin.orders", newStatus));
    };

    return (
        <>
            <AdminHeader title="Orders" />

            <section className={styles.container}>
                <FlashMessage />
                {/* Filtre par status */}
                <div className={styles.statusFilter}>
                    {statuses.map((s) => (
                        <AdminButton
                            key={s}
                            variant={status === s ? "edit" : "default"}
                            onClick={() => changeStatus(s)}
                        >
                            {s.charAt(0).toUpperCase() + s.slice(1)}
                        </AdminButton>
                    ))}
                </div>

                {orders.length === 0 ? (
                    <p className={styles.noOrders}>
                        No orders {status || ""} found.
                    </p>
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
                                <th>Show</th>
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
                                            order.user ? "" : styles.deletedUser
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
                                    <td>
                                        <Link
                                            href={route(
                                                "admin.orders.show",
                                                order.id
                                            )}
                                        >
                                            <AdminButton>Show More</AdminButton>
                                        </Link>
                                    </td>
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
                                        {!order.isArchived && order.status === "confirmed" && (
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
