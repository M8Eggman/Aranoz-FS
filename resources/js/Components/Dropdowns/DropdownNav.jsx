import React from "react";
import styles from "./DropdownNav.module.css";
import { IoMdArrowDropdown } from "react-icons/io";
import { Link } from "@inertiajs/react";

export default function DropdownNav({
    label = "",
    image = null,
    options = [],
    auth = false,
}) {
    return (
        <div className={styles.dropdown}>
            <div className={styles.trigger}>
                {image && <img className={styles.image} src={image} alt="" />}
                {label} <IoMdArrowDropdown className="inline-block" />
            </div>
            <div
                className={styles.content}
                style={auth ? { left: "initial", right: 0 } : {}}
            >
                <ul>
                    {options.map((option, index) => (
                        <li key={index}>
                            {option.type === "link" && (
                                <Link href={route(option.route)}>
                                    {option.text}
                                </Link>
                            )}
                            {option.type === "button" && (
                                <button onClick={option.onClick}>
                                    {option.text}
                                </button>
                            )}
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}
