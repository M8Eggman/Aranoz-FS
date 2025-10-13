import React from "react";
import BackLayout from "@/Layouts/BackLayout";
import AdminHeader from "@/Pages/Admin/partials/Header/AdminHeader";
import QuickAccessCard from "@/Components/Cards/QuickAccessCard";
import styles from "./Home.module.css";
import StatCard from "@/Components/Cards/StatCard";
import { FaUsers, FaShoppingCart, FaTags, FaEnvelope } from "react-icons/fa";

export default function AdminHome({
    auth,
    usersCount,
    ordersCount,
    productsCount,
    unreadMailsCount,
}) {
    const role = auth.user?.role?.name;

    const quickAccessCards = [
        {
            title: "Categories",
            description: "Manage your product and blog categories",
            links: [
                {
                    text: "Product Categories",
                    route: "admin.products-categories",
                },
                { text: "Blog Categories", route: "admin.blogs-categories" },
            ],
            roles: ["admin", "community_manager"],
        },
        {
            title: "Data Management",
            description:
                "Manage colors and countries used throughout the system",
            links: [
                { text: "Manage Colors", route: "admin.colors" },
                { text: "Manage Countries", route: "admin.countries" },
            ],
            roles: ["admin"],
        },
        {
            title: "Orders",
            description: "Track and manage customer orders",
            links: [
                {
                    text: "Pending Orders",
                    route: "admin.orders",
                    params: { status: "pending" },
                },
                { text: "All Orders", route: "admin.orders" },
            ],
            roles: ["admin", "agent"],
        },
        {
            title: "Products",
            description: "Create and manage your product catalog",
            links: [
                { text: "Create a Product", route: "admin.home" },
                { text: "All Products", route: "admin.home" },
                { text: "Coupons", route: "admin.coupons" },
            ],
            roles: ["admin", "webmaster"],
        },
        {
            title: "Blogs",
            description: "Write and manage your blog posts",
            links: [
                { text: "Create a Blog", route: "admin.home" },
                { text: "All Blogs", route: "admin.home" },
                { text: "Tags", route: "admin.tags" },
            ],
            roles: ["admin", "community_manager"],
        },
        {
            title: "Mailbox",
            description: "Check and organize your messages",
            links: [
                {
                    text: "Archived Messages",
                    route: "admin.mailings",
                    params: { status: "archived" },
                },
                { text: "All Messages", route: "admin.mailings" },
            ],
            roles: ["admin", "agent"],
        },
        {
            title: "Users",
            description: "Manage users and their roles",
            links: [{ text: "All Users", route: "admin.users" }],
            roles: ["admin"],
        },
        {
            title: "Contact Info",
            description: "Edit your contact information",
            links: [
                { text: "Manage Contact Info", route: "contact.info.index" },
            ],
            roles: ["admin", "webmaster"],
        },
    ];

    const statCards = [
        { icon: FaUsers, title: "Users", value: usersCount },
        { icon: FaShoppingCart, title: "Orders", value: ordersCount },
        { icon: FaTags, title: "Products", value: productsCount },
        {
            icon: FaEnvelope,
            title: "Unread Mails",
            value: unreadMailsCount,
            roles: ["admin", "agent"],
        },
    ];

    return (
        <>
            <AdminHeader title="Admin Dashboard" />
            <section className={styles.container}>
                <h3>Statistics</h3>
                <div className={styles.cardContainer}>
                    {statCards
                        .filter(
                            (card) => !card.roles || card.roles.includes(role)
                        )
                        .map((card, i) => (
                            <StatCard
                                key={i}
                                icon={card.icon}
                                title={card.title}
                                value={card.value}
                            />
                        ))}
                </div>
            </section>
            <section className={styles.container}>
                <h3>Quick Access</h3>
                <div className={styles.cardContainer}>
                    {quickAccessCards
                        .filter(
                            (card) => !card.roles || card.roles.includes(role)
                        )
                        .map((card, i) => (
                            <QuickAccessCard
                                key={i}
                                title={card.title}
                                description={card.description}
                                links={card.links}
                            />
                        ))}
                </div>
            </section>
        </>
    );
}

AdminHome.layout = (page) => <BackLayout>{page}</BackLayout>;
