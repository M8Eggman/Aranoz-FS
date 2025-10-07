import React, { useEffect, useState } from "react";
import styles from "./Nav.module.css";
import { Link, router, usePage } from "@inertiajs/react";
import DropdownNav from "../Dropdowns/DropdownNav";
import { VscThreeBars } from "react-icons/vsc";

export default function BackNav() {
    const { auth } = usePage().props;
    const role = auth.user?.role?.name;

    const [menuOpen, setMenuOpen] = useState(false);

    // Elements de la nav
    const navItems = [
        {
            type: "dropdown",
            label: "Categories",
            options: [
                {
                    type: "link",
                    route: "admin.products-categories",
                    text: "Product Categories",
                },
                {
                    type: "link",
                    route: "admin.blogs-categories",
                    text: "Blog Categories",
                },
            ],
            roles: ["admin"],
        },
        {
            type: "dropdown",
            label: "Orders",
            options: [
                { type: "link", route: "admin.home", text: "Pending" },
                { type: "link", route: "admin.home", text: "Validated" },
                { type: "link", route: "admin.home", text: "Archived" },
                { type: "link", route: "admin.home", text: "All Orders" },
            ],
            roles: ["admin", "agent"],
        },
        {
            type: "dropdown",
            label: "Blogs",
            options: [
                { type: "link", route: "admin.home", text: "Create a Blog" },
                { type: "link", route: "admin.home", text: "All Blogs" },
                { type: "link", route: "admin.tags", text: "Tags" },
            ],
            roles: ["admin", "community_manager"],
        },
        {
            type: "dropdown",
            label: "Products",
            options: [
                { type: "link", route: "admin.home", text: "Create a Product" },
                { type: "link", route: "admin.home", text: "All Products" },
            ],
            roles: ["admin", "webmaster"],
        },
        {
            type: "dropdown",
            label: "Mailbox",
            options: [
                { type: "link", route: "admin.home", text: "Archived" },
                { type: "link", route: "admin.home", text: "All Messages" },
            ],
            roles: ["admin", "agent"],
        },
        {
            type: "link",
            label: "Users",
            route: "admin.home",
            roles: ["admin"],
        },
        {
            type: "link",
            label: "Contact Info",
            route: "admin.home",
            roles: ["admin", "webmaster"],
        },
    ];

    const authOptions = [
        {
            type: "button",
            onClick: () => {
                router.post(route("logout"));
            },
            text: "Log Out",
        },
        { type: "link", route: "home", text: "Back Home" },
    ];
    useEffect(() => {
        console.log(auth.user.images);
    }, []);

    return (
        <nav className={`${styles.nav} ${styles.navBack}`}>
            <div className={styles.brandContainer}>
                <button
                    className={styles.burger}
                    onClick={() => setMenuOpen(!menuOpen)}
                >
                    <VscThreeBars />
                </button>
                <Link className={styles.brand} href={route("admin.home")}>
                    Admin <span className={styles.label}>{role}</span>
                </Link>
            </div>

            <ul
                className={`${styles.menu} ${styles.menuBack} ${
                    menuOpen ? styles.menuOpen : ""
                }`}
            >
                {navItems
                    .filter((item) => item.roles.includes(role))
                    .map((item, i) => (
                        <li key={i}>
                            {item.type === "link" ? (
                                <Link
                                    className={styles.link}
                                    href={route(item.route)}
                                    onClick={() => setMenuOpen(false)}
                                >
                                    {item.label}
                                </Link>
                            ) : (
                                <DropdownNav
                                    label={item.label}
                                    options={item.options}
                                />
                            )}
                        </li>
                    ))}
            </ul>
            <div className={styles.actions}>
                {auth?.user && (
                    <DropdownNav
                        auth={true}
                        label={auth.user.name}
                        image={
                            auth.user?.images?.small ||
                            "/storage/users/templateU.png"
                        }
                        options={authOptions}
                    />
                )}
            </div>
        </nav>
    );
}
