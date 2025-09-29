import React from "react";
import styles from "./Nav.module.css";
import { Link, usePage } from "@inertiajs/react";
import DropdownNav from "../Dropdowns/DropdownNav";

export default function BackNav() {
    const { auth, can } = usePage().props;

    // Contenues du dropdown
    const categoriesOptions = [
        { type: "link", route: "admin.home", text: "Product Categories" },
        { type: "link", route: "admin.home", text: "Blog Categories" },
        { type: "link", route: "admin.home", text: "Tags" },
    ];
    const ordersOptions = [
        { type: "link", route: "admin.home", text: "Pending" },
        { type: "link", route: "admin.home", text: "Validated" },
        { type: "link", route: "admin.home", text: "Archived" },
        { type: "link", route: "admin.home", text: "All Orders" },
    ];
    const blogsOptions = [
        { type: "link", route: "admin.home", text: "Create a Blog" },
        { type: "link", route: "admin.home", text: "All Blogs" },
    ];
    const productsOptions = [
        { type: "link", route: "admin.home", text: "Create a Product" },
        { type: "link", route: "admin.home", text: "All Products" },
    ];
    const mailboxOptions = [
        { type: "link", route: "admin.home", text: "Archived" },
        { type: "link", route: "admin.home", text: "All Messages" },
    ];
    const authOptions = [
        { type: "button", onClick: () => {}, text: "Log Out" },
        { type: "link", route: "home", text: "Back Home" },
    ];

    return (
        <nav className={styles.nav}>
            <Link className={styles.brand} href={route("home")}>
                Admin <span className={styles.label}>{auth.user?.role}</span>
            </Link>

            <ul className={styles.menu}>
                <li>
                    <Link className={styles.link} href={route("admin.home")}>
                        Contact Info
                    </Link>
                </li>
                <li>
                    <Link className={styles.link} href={route("admin.home")}>
                        Users
                    </Link>
                </li>
                <li>
                    <DropdownNav
                        label="Categories"
                        options={categoriesOptions}
                    />
                </li>
                <li>
                    <DropdownNav label="Orders" options={ordersOptions} />
                </li>
                <li>
                    <DropdownNav label="Blogs" options={blogsOptions} />
                </li>
                <li>
                    <DropdownNav label="Products" options={productsOptions} />
                </li>
                <li>
                    <DropdownNav label="Products" options={mailboxOptions} />
                </li>
            </ul>

            <div className={styles.actions}>
                <DropdownNav
                    image={
                        auth?.user
                            ? auth.user.image
                            : "/storage/user/templateU.svg" // fallback image
                    }
                    options={authOptions}
                />
            </div>
        </nav>
    );
}
