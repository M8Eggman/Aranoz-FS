import React from "react";
import FrontLayout from "@/Layouts/FrontLayout";
import PublicHeader from "@/Components/Header/PublicHeader";
import styles from "./OrderShow.module.css";
import {
    formatDate,
    formatPrice,
    formatUnderscore,
} from "@/utils/StringHelper";

export default function Show({ order }) {
    const orderInfo = order;

    const billingDetail = orderInfo?.billing_detail
        ? orderInfo?.billing_detail
        : JSON.parse(orderInfo?.billing_detail);

    const orderItems = orderInfo?.order_items;
    const promotion = orderInfo?.promotion;

    return (
        <>
            <PublicHeader
                title="Order Details"
                subtitle="Home - Order Details"
            />
            <section className={styles.wrapper}>
                <div className={styles.container}>
                    <h3 className={styles.title}>
                        Tracking of order - {order.order_number}
                    </h3>

                    <div className={styles.orderGrid}>
                        {/* Order Info */}
                        <div className={styles.card}>
                            <h4 className={styles.cardTitle}>
                                Order Information
                            </h4>
                            <div className={styles.infoGrid}>
                                <div className={styles.infoItem}>
                                    <span className={styles.label}>
                                        Order Number:
                                    </span>
                                    <span className={styles.value}>
                                        {order.order_number}
                                    </span>
                                </div>
                                <div className={styles.infoItem}>
                                    <span className={styles.label}>Date:</span>
                                    <span className={styles.value}>
                                        {formatDate(order.created_at)}
                                    </span>
                                </div>
                                <div className={styles.infoItem}>
                                    <span className={styles.label}>Total:</span>
                                    <span className={styles.value}>
                                        {formatPrice(order.total_price)}
                                    </span>
                                </div>
                                <div className={styles.infoItem}>
                                    <span className={styles.label}>
                                        Status:
                                    </span>
                                    <span className={styles.value}>
                                        {order.status}
                                    </span>
                                </div>
                                <div className={styles.infoItem}>
                                    <span className={styles.label}>
                                        Payment Method:
                                    </span>
                                    <span className={styles.value}>
                                        Check Payments
                                    </span>
                                </div>
                            </div>
                        </div>

                        {/* Billing Address */}
                        <div className={styles.card}>
                            <h4 className={styles.cardTitle}>
                                Billing Address
                            </h4>
                            <div className={styles.infoGrid}>
                                <div className={styles.infoItem}>
                                    <span className={styles.label}>
                                        Full Name:
                                    </span>
                                    <span className={styles.value}>
                                        {billingDetail?.first_name}{" "}
                                        {billingDetail?.last_name}
                                    </span>
                                </div>
                                <div className={styles.infoItem}>
                                    <span className={styles.label}>
                                        Street:
                                    </span>
                                    <span className={styles.value}>
                                        {billingDetail?.address}{" "}
                                        {billingDetail?.number}
                                    </span>
                                </div>
                                <div className={styles.infoItem}>
                                    <span className={styles.label}>City:</span>
                                    <span className={styles.value}>
                                        {billingDetail?.city}
                                    </span>
                                </div>
                                <div className={styles.infoItem}>
                                    <span className={styles.label}>
                                        Country:
                                    </span>
                                    <span className={styles.value}>
                                        {billingDetail?.country?.name}
                                    </span>
                                </div>
                                <div className={styles.infoItem}>
                                    <span className={styles.label}>
                                        Postcode:
                                    </span>
                                    <span className={styles.value}>
                                        {billingDetail?.zip}
                                    </span>
                                </div>
                            </div>
                        </div>

                        {/* Shipping Address */}
                        <div className={styles.card}>
                            <h4 className={styles.cardTitle}>
                                Shipping Address
                            </h4>
                            <div className={styles.infoGrid}>
                                <div className={styles.infoItem}>
                                    <span className={styles.label}>
                                        Firstname:
                                    </span>
                                    <span className={styles.value}>
                                        {billingDetail?.first_name}
                                    </span>
                                </div>
                                <div className={styles.infoItem}>
                                    <span className={styles.label}>
                                        Lastname:
                                    </span>
                                    <span className={styles.value}>
                                        {billingDetail?.last_name}
                                    </span>
                                </div>
                                <div className={styles.infoItem}>
                                    <span className={styles.label}>
                                        Street:
                                    </span>
                                    <span className={styles.value}>
                                        {billingDetail?.address}{" "}
                                        {billingDetail?.number}
                                    </span>
                                </div>
                                <div className={styles.infoItem}>
                                    <span className={styles.label}>City:</span>
                                    <span className={styles.value}>
                                        {billingDetail?.city}
                                    </span>
                                </div>
                                <div className={styles.infoItem}>
                                    <span className={styles.label}>
                                        Country:
                                    </span>
                                    <span className={styles.value}>
                                        {billingDetail?.country?.name}
                                    </span>
                                </div>
                                <div className={styles.infoItem}>
                                    <span className={styles.label}>
                                        Postcode:
                                    </span>
                                    <span className={styles.value}>
                                        {billingDetail?.zip}
                                    </span>
                                </div>
                            </div>
                        </div>

                        {/* Customer Details */}
                        <div className={styles.card}>
                            <h4 className={styles.cardTitle}>
                                Customer Details
                            </h4>
                            <div className={styles.infoGrid}>
                                <div className={styles.infoItem}>
                                    <span className={styles.label}>
                                        Firstname:
                                    </span>
                                    <span className={styles.value}>
                                        {billingDetail?.first_name}
                                    </span>
                                </div>
                                <div className={styles.infoItem}>
                                    <span className={styles.label}>
                                        Lastname:
                                    </span>
                                    <span className={styles.value}>
                                        {billingDetail?.last_name}
                                    </span>
                                </div>
                                <div className={styles.infoItem}>
                                    <span className={styles.label}>Email:</span>
                                    <span className={styles.value}>
                                        {billingDetail?.user?.email}
                                    </span>
                                </div>
                                <div className={styles.infoItem}>
                                    <span className={styles.label}>
                                        Phone Number:
                                    </span>
                                    <span className={styles.value}>
                                        {billingDetail?.phone_number}
                                    </span>
                                </div>
                                <div className={styles.infoItem}>
                                    <span className={styles.label}>
                                        Payment Method:
                                    </span>
                                    <span className={styles.value}>
                                        {formatUnderscore(
                                            orderInfo?.payment_method
                                        )}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Order Items */}
                    <div className={styles.orderItemsCard}>
                        <h4 className={styles.cardTitle}>Order Details</h4>
                        <div className={styles.tableWrapper}>
                            <table className={styles.orderTable}>
                                <thead>
                                    <tr>
                                        <th>Product</th>
                                        <th>Quantity</th>
                                        <th>Price</th>
                                        <th>Promotion</th>
                                        <th>Total</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {orderItems?.map((item, index) => (
                                        <tr key={index}>
                                            <td>{item.product_name}</td>
                                            <td>x {item.quantity}</td>
                                            <td>
                                                {formatPrice(
                                                    Number(item.product_price)
                                                )}
                                            </td>
                                            <td>
                                                {item.product_promotion
                                                    ? "-" +
                                                      item.product_promotion +
                                                      "%"
                                                    : "No promotion"}
                                            </td>
                                            <td>
                                                {formatPrice(
                                                    Number(
                                                        item.product_final_price
                                                    ) * Number(item.quantity)
                                                )}
                                            </td>
                                        </tr>
                                    ))}
                                    {order.promotion_percentage &&
                                        order.promotion_name && (
                                            <tr className={styles.promoRow}>
                                                <td colSpan="3"></td>
                                                <td
                                                    className={
                                                        styles.promoLabel
                                                    }
                                                >
                                                    Promotion
                                                </td>
                                                <td
                                                    className={
                                                        styles.promoValue
                                                    }
                                                >
                                                    {order.promotion_name}{" "}
                                                    {`-${order.promotion_percentage}%`}
                                                </td>
                                            </tr>
                                        )}

                                    <tr className={styles.totalRow}>
                                        <td colSpan="3"></td>
                                        <td className={styles.totalLabel}>
                                            Total
                                        </td>
                                        <td className={styles.totalValue}>
                                            {formatPrice(order.total_price)}
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}

Show.layout = (page) => <FrontLayout>{page}</FrontLayout>;
