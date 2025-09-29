import React from "react";
import BackLayout from "@/Layouts/BackLayout";
import AdminHeader from "@/Components/Header/Header";
import QuickAccessCard from "@/Components/Cards/QuickAccessCard";
import styles from "./Home.module.css";

export default function AdminHome() {
    const quickAccessCards = [
        {
            title: "Categories",
            description: "Gérez vos produits, blogs et tags rapidement",
            links: [
                { text: "Product Categories", route: "admin.home" },
                { text: "Blog Categories", route: "admin.home" },
                { text: "Tags", route: "admin.home" },
            ],
        },
        {
            title: "Orders",
            description: "Suivez et gérez vos commandes en attente ou validées",
            links: [
                { text: "Pending", route: "admin.home" },
                { text: "Validated", route: "admin.home" },
                { text: "All Orders", route: "admin.home" },
            ],
        },
        {
            title: "Blogs",
            description: "Créez ou consultez vos articles de blog facilement",
            links: [
                { text: "Create a Blog", route: "admin.home" },
                { text: "All Blogs", route: "admin.home" },
            ],
        },
        {
            title: "Products",
            description:
                "Ajoutez de nouveaux produits ou consultez votre catalogue",
            links: [
                { text: "Create a Product", route: "admin.home" },
                { text: "All Products", route: "admin.home" },
            ],
        },
        {
            title: "Mailbox",
            description:
                "Consultez les messages et archives de votre boîte mail",
            links: [
                { text: "Archived", route: "admin.home" },
                { text: "All Messages", route: "admin.home" },
            ],
        },
        {
            title: "Contact Info",
            description: "Accédez rapidement aux informations de contact",
            links: [{ text: "Manage Contact Info", route: "admin.home" }],
        },
        {
            title: "Users",
            description: "Gérez les utilisateurs et leurs rôles",
            links: [
                { text: "All Users", route: "admin.home" },
                { text: "Roles & Permissions", route: "admin.home" },
            ],
        },
    ];

    return (
        <>
            <AdminHeader title="Admin Dashboard" />
            <div className={styles.container}>
                <h3>Quick Access</h3>
                <div className={styles.cardContainer}>
                    {quickAccessCards.map((card, i) => (
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
