import React from "react";
import BackLayout from "@/Layouts/BackLayout";
import AdminHeader from "@/Components/Header/Header";
import QuickAccessCard from "@/Components/Cards/QuickAccessCard";
import styles from "./Home.module.css";

export default function AdminHome({ auth }) {
    const role = auth.user?.role?.name;

    const quickAccessCards = [
        {
            title: "Categories",
            description: "Manage your products, blogs, and tags quickly",
            links: [
                { text: "Product Categories", route: "admin.home" },
                { text: "Blog Categories", route: "admin.home" },
                { text: "Tags", route: "admin.home" },
            ],
            roles: ["admin", "community_manager"],
        },
        {
            title: "Orders",
            description: "Track and manage pending or validated orders",
            links: [
                { text: "Pending", route: "admin.home" },
                { text: "Validated", route: "admin.home" },
                { text: "All Orders", route: "admin.home" },
            ],
            roles: ["admin", "agent"],
        },
        {
            title: "Products",
            description: "Add new products or browse your catalog",
            links: [
                { text: "Create a Product", route: "admin.home" },
                { text: "All Products", route: "admin.home" },
            ],
            roles: ["admin", "webmaster"],
        },
        {
            title: "Mailbox",
            description: "Check your messages and archives",
            links: [
                { text: "Archived", route: "admin.home" },
                { text: "All Messages", route: "admin.home" },
            ],
            roles: ["admin", "agent"],
        },
        {
            title: "Blogs",
            description: "Create or view your blog posts easily",
            links: [
                { text: "Create a Blog", route: "admin.home" },
                { text: "All Blogs", route: "admin.home" },
            ],
            roles: ["admin", "community_manager"],
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
            <div className={styles.container}>
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
            </div>
        </>
    );
}

AdminHome.layout = (page) => <BackLayout>{page}</BackLayout>;
