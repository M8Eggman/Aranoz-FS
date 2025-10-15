import React, {  useState } from "react";
import styles from "./Nav.module.css";
import { Link, router, usePage } from "@inertiajs/react";
import DropdownNav from "../Dropdowns/DropdownNav";
import { VscThreeBars } from "react-icons/vsc";
import { CiUser } from "react-icons/ci";

export default function BackNav() {
    const { url } = usePage();
    const { auth } = usePage().props;

    const role = auth.user?.role?.name;

    const isAuthPage = ["register", "login"].some((path) => url.includes(path));

    const [menuOpen, setMenuOpen] = useState(false);

    // Elements de la nav
    const navItems = [
        {
            type: "link",
            label: "Home",
            route: "home",
        },
        {
            type: "dropdown",
            label: "Shop",
            options: [
                { type: "link", route: "home", text: "Shop Category" },
                { type: "link", route: "home", text: "Track Your Order" },
            ],
        },
        {
            type: "link",
            label: "Blogs",
            route: "home",
        },
        {
            type: "link",
            label: "Contact",
            route: "home",
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
        {
            type: "link",
            route: "profile.edit",
            text: "Profile",
        },
        {
            type: "link",
            route: "home",
            text: "View your last Order",
        },
        {
            type: "link",
            route: "admin.home",
            text: "Backend Panel",
            roles: ["admin", "webmaster", "agent", "community_manager"],
        },
    ];

    const guestOptions = [
        {
            type: "link",
            route: "login",
            text: "Log In",
        },
        {
            type: "link",
            route: "register",
            text: "Register",
        },
    ];

    return (
        <nav
            className={`${styles.nav} ${isAuthPage ? styles.navAuth : ""} ${
                styles.navFront
            }`}
        >
            <div className={styles.container}>
                <div className={styles.brandContainer}>
                    <button
                        className={styles.burger}
                        onClick={() => setMenuOpen(!menuOpen)}
                    >
                        <VscThreeBars />
                    </button>
                    <Link className={styles.brand} href={route("home")}>
                        Aranoz.
                    </Link>
                </div>
                <ul
                    className={`${styles.menu} ${
                        isAuthPage ? styles.menuAuth : ""
                    } ${styles.menuFront} ${menuOpen ? styles.menuOpen : ""}`}
                >
                    {navItems
                        .filter(
                            (item) => !item.roles || item.roles?.includes(role)
                        )
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
                    {auth?.user ? (
                        <DropdownNav
                            auth={true}
                            label={auth.user.name}
                            image={
                                auth.user?.images?.small ||
                                "/storage/users/templateU.png"
                            }
                            role={role}
                            options={authOptions}
                        />
                    ) : (
                        <DropdownNav
                            icon={<CiUser size={24} className="font-bold"/>}
                            auth={true}
                            options={guestOptions}
                        />
                    )}
                </div>
            </div>
        </nav>
    );
}
