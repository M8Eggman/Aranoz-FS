import React from "react";
import { FaCalendarAlt, FaUser, FaTag, FaComment } from "react-icons/fa";
import styles from "./BlogCard.module.css";
import { formatDate } from "@/utils/StringHelper";
import { Link } from "@inertiajs/react";

export default function BlogCard({ blog, onClick }) {
    const date = new Date(blog.created_at);

    return (
        <Link
            href={route("blog.show", blog.id)}
            className={styles.blogCard}
            onClick={() => onClick(blog.id)}
        >
            <div className={styles.cardImage}>
                <img
                    src={blog.image || "/storage/offer/templateP.png"}
                    alt={blog.title}
                />
                <div className={styles.dateTag}>
                    {
                        <span>
                            {date.toLocaleDateString("en-US", {
                                day: "numeric",
                            })}
                        </span>
                    }
                    {
                        <span>
                            {date.toLocaleDateString("en-US", {
                                month: "short",
                            })}
                        </span>
                    }
                </div>
            </div>

            <div className={styles.cardContent}>
                <h3 className={styles.cardTitle}>{blog.title}</h3>

                <p className={styles.cardDescription}>{blog.description}</p>

                <div className={styles.cardMeta}>
                    <span className={styles.metaItem}>
                        <FaTag />
                        {blog.category?.name}
                    </span>
                    <span className={styles.metaItem}>
                        <FaUser />
                        {blog.user?.name}
                    </span>
                    <span className={styles.metaItem}>
                        <FaComment />
                        {blog.comments?.length || 0} Comments
                    </span>
                    <span className={styles.metaItem}>
                        <FaTag />
                        {blog.tags?.map((tag) => tag.name).join(", ")}
                    </span>
                </div>
            </div>
        </Link>
    );
}
