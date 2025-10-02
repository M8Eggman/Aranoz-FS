import React from "react";
import BackLayout from "@/Layouts/BackLayout";
import AdminHeader from "@/Pages/Admin/partials/Header/AdminHeader";
import QuickAccessCard from "@/Components/Cards/QuickAccessCard";
import styles from "./Home.module.css";

export default function AdminHome({ auth }) {
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
            title: "Tags",
            description: "Create and manage your tags",
            links: [
                { text: "Create a Tag", route: "admin.home" },
                { text: "All Tags", route: "admin.home" },
            ],
            roles: ["admin", "community_manager"],
        },
        {
            title: "Orders",
            description: "Track and manage customer orders",
            links: [
                { text: "Pending Orders", route: "admin.home" },
                { text: "All Orders", route: "admin.home" },
            ],
            roles: ["admin", "agent"],
        },
        {
            title: "Products",
            description: "Create and manage your product catalog",
            links: [
                { text: "Create a Product", route: "admin.home" },
                { text: "All Products", route: "admin.home" },
            ],
            roles: ["admin", "webmaster"],
        },
        {
            title: "Blogs",
            description: "Write and manage your blog posts",
            links: [
                { text: "Create a Blog", route: "admin.home" },
                { text: "All Blogs", route: "admin.home" },
            ],
            roles: ["admin", "community_manager"],
        },
        {
            title: "Mailbox",
            description: "Check and organize your messages",
            links: [
                { text: "Archived Messages", route: "admin.home" },
                { text: "All Messages", route: "admin.home" },
            ],
            roles: ["admin", "agent"],
        },
        {
            title: "Users",
            description: "Manage users and their roles",
            links: [
                { text: "All Users", route: "admin.home" },
                { text: "Roles & Permissions", route: "admin.home" },
            ],
            roles: ["admin"],
        },
        {
            title: "Contact Info",
            description: "Edit your contact information",
            links: [{ text: "Manage Contact Info", route: "admin.home" }],
            roles: ["admin", "webmaster"],
        },
    ];

    return (
        <>
            <AdminHeader title="Admin Dashboard" />
            <section className={styles.container}>
                <h3>Quick Access</h3>
                <div className={styles.cardContainer}>
                    {quickAccessCards
                        .filter((card) => card.roles.includes(role))
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
