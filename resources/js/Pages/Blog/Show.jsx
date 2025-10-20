import React from "react";
import FrontLayout from "@/Layouts/FrontLayout";
import BlogLayout from "./Partials/BlogLayout";
import BlogCard from "@/Components/Cards/BlogCard";
import BlogCommentsSection from "./Partials/BlogCommentsSection";

export default function Show({ blog, tags, categories, blogs, allBlogs }) {
    return (
        <BlogLayout blogs={blogs} tags={tags} categories={categories} allBlogs={allBlogs}>
            <BlogCard blog={blog} />
            <BlogCommentsSection blogId={blog.id} comments={blog.comments} />
        </BlogLayout>
    );
}

Show.layout = (page) => <FrontLayout>{page}</FrontLayout>;
