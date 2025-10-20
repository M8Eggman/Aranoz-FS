import React from "react";
import FrontLayout from "@/Layouts/FrontLayout";
import styles from "./Blog.module.css";
import BlogCard from "@/Components/Cards/BlogCard";
import BlogLayout from "./Partials/BlogLayout";

export default function Index({ blogs, categories, tags, allBlogs }) {
    return (
        <>
            <BlogLayout blogs={blogs} tags={tags} categories={categories} allBlogs={allBlogs}>
                {/* Main Content - Blog Display */}
                {blogs.length > 0 ? (
                    blogs.map((blog) => <BlogCard key={blog.id} blog={blog} />)
                ) : (
                    <div className={styles.noBlogSelected}>
                        <p>There is no blog post to display</p>
                    </div>
                )}
            </BlogLayout>
        </>
    );
}

Index.layout = (page) => <FrontLayout>{page}</FrontLayout>;
