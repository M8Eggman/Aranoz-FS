import React from "react";
import { Link } from "@inertiajs/react";
import FrontLayout from "@/Layouts/FrontLayout";
import PublicHeader from "@/Components/Header/PublicHeader";
import {
    FaEye,
    FaCalendarAlt,
    FaShoppingCart,
    FaMapMarkerAlt,
} from "react-icons/fa";
import styles from "./ViewOrders.module.css";
import { formatDate } from "@/utils/StringHelper";
import FlashMessage from "@/Components/FlashMessage/FlashMessage";

export default function ViewOrders({ orders }) {
    const getStatusColor = (status) => {
        switch (status?.toLowerCase()) {
            case "pending":
                return styles.statusPending;
            case "processing":
                return styles.statusProcessing;
            case "shipped":
                return styles.statusShipped;
            case "delivered":
                return styles.statusDelivered;
            case "cancelled":
                return styles.statusCancelled;
            default:
                return styles.statusDefault;
        }
    };

    const getStatusText = (status) => {
        switch (status?.toLowerCase()) {
            case "pending":
                return "Pending";
            case "processing":
                return "Processing";
            case "shipped":
                return "Shipped";
            case "delivered":
                return "Delivered";
            case "cancelled":
                return "Cancelled";
            default:
                return "Unknown";
        }
    };

    const calculateTotalItems = (orderItems) => {
        return (
            orderItems?.reduce((total, item) => total + item.quantity, 0) || 0
        );
    };

    return (
        <>
            <PublicHeader title="My Orders" subtitle="Home - My Orders" />
            <section className={styles.wrapper}>
                <div className={styles.container}>

                    <FlashMessage className="mb-5" />

                    {orders && orders.length > 0 ? (
                        <div className={styles.ordersGrid}>
                            {orders.map((order) => (
                                <div
                                    key={order.id}
                                    className={styles.orderCard}
                                >
                                    <div className={styles.orderHeader}>
                                        <div className={styles.orderInfo}>
                                            <h3 className={styles.orderNumber}>
                                                Order #{order.order_number}
                                            </h3>
                                            <div className={styles.orderMeta}>
                                                <span
                                                    className={styles.orderDate}
                                                >
                                                    <FaCalendarAlt />
                                                    {formatDate(
                                                        order.created_at
                                                    )}
                                                </span>
                                                <span
                                                    className={
                                                        styles.orderItems
                                                    }
                                                >
                                                    <FaShoppingCart />
                                                    {calculateTotalItems(
                                                        order.order_items
                                                    )}{" "}
                                                    items
                                                </span>
                                            </div>
                                        </div>
                                        <div
                                            className={`${
                                                styles.orderStatus
                                            } ${getStatusColor(order.status)}`}
                                        >
                                            {getStatusText(order.status)}
                                        </div>
                                    </div>

                                    <div className={styles.orderDetails}>
                                        <div className={styles.orderSummary}>
                                            <div className={styles.summaryItem}>
                                                <span
                                                    className={
                                                        styles.summaryLabel
                                                    }
                                                >
                                                    Total:
                                                </span>
                                                <span
                                                    className={
                                                        styles.summaryValue
                                                    }
                                                >
                                                    $
                                                    {Number(
                                                        order.total_price
                                                    ).toFixed(2)}
                                                </span>
                                            </div>
                                            {order.promotion && (
                                                <div
                                                    className={
                                                        styles.summaryItem
                                                    }
                                                >
                                                    <span
                                                        className={
                                                            styles.summaryLabel
                                                        }
                                                    >
                                                        Promotion:
                                                    </span>
                                                    <span
                                                        className={
                                                            styles.summaryValue
                                                        }
                                                    >
                                                        {order.promotion.name}
                                                    </span>
                                                </div>
                                            )}
                                        </div>
                                    </div>

                                    <div className={styles.orderActions}>
                                        <Link
                                            href={route(
                                                "track-your-order.show",
                                                order.order_number
                                            )}
                                            className={styles.trackButton}
                                        >
                                            <FaEye />
                                            Track Order
                                        </Link>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className={styles.noOrders}>
                            <div className={styles.noOrdersIcon}>
                                <FaShoppingCart />
                            </div>
                            <h2>No Orders Found</h2>
                            <p>You haven't placed any orders yet.</p>
                            <Link
                                href={route("products.index")}
                                className={styles.shopButton}
                            >
                                Start Shopping
                            </Link>
                        </div>
                    )}
                </div>
            </section>
        </>
    );
}

ViewOrders.layout = (page) => <FrontLayout>{page}</FrontLayout>;
