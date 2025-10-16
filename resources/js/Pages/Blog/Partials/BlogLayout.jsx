import React, { useState } from "react";
import PublicHeader from "@/Components/Header/PublicHeader";
import styles from "../Blog.module.css";
import TextInput from "@/Components/Form/TextInput/TextInput";
import Button from "@/Components/Form/Buttons/Button";
import { router } from "@inertiajs/react";
import { formatDate } from "@/utils/StringHelper";

export default function BlogLayout({
    children,
    allBlogs,
    blogs,
    tags,
    category_id,
    categories,
}) {
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedCategory, setSelectedCategory] = useState(
        category_id || null
    );
    const [selectedTag, setSelectedTag] = useState(null);

    const handleSearch = (e) => {
        e.preventDefault();
        router.get(route("blog.index"), {
            search: searchTerm,
            category_id: selectedCategory,
        });
    };

    const handleCategoryFilter = (categoryId) => {
        const newCategory = selectedCategory === categoryId ? null : categoryId;
        setSelectedCategory(newCategory);
        router.get(route("blog.index"), {
            search: searchTerm,
            category_id: newCategory,
            tag_id: selectedTag,
        });
    };

    const handleBlogSelect = (blogId) => {
        router.get(route("blog.index"), {
            blog_id: blogId,
        });
    };

    const handleTagFilter = (tagId) => {
        const newTag = selectedTag === tagId ? null : tagId;
        setSelectedTag(newTag);
        router.get(route("blog.index"), {
            search: searchTerm,
            category_id: selectedCategory,
            tag_id: newTag,
        });
    };

    return (
        <>
            <PublicHeader title="Blog" subtitle="Home - Blog" />

            <section className={styles.wrapper}>
                <div className={styles.container}>
                    <div className={styles.blogContent}>
                        {/* Left Sidebar - Blog List */}
                        <aside className={styles.sidebar}>
                            {/* Search */}
                            <div className={styles.searchSection}>
                                <form
                                    onSubmit={handleSearch}
                                    className={styles.searchForm}
                                >
                                    <div className={styles.searchInputWrapper}>
                                        <TextInput
                                            type="text"
                                            placeholder="Search Keyword"
                                            value={searchTerm}
                                            onChange={(e) =>
                                                setSearchTerm(e.target.value)
                                            }
                                            className={styles.searchInput}
                                        />
                                    </div>
                                    <Button
                                        type="submit"
                                        className={styles.searchButton}
                                    >
                                        SEARCH
                                    </Button>
                                </form>
                            </div>

                            {/* Categories */}
                            <div className={styles.categoriesSection}>
                                <h3 className={styles.sectionTitle}>
                                    Category
                                </h3>
                                <ul className={styles.categoriesList}>
                                    {categories.map((category) => (
                                        <li key={category.id}>
                                            <button
                                                className={`${
                                                    styles.categoryItem
                                                } ${
                                                    selectedCategory ===
                                                    category.id
                                                        ? styles.active
                                                        : ""
                                                }`}
                                                onClick={() =>
                                                    handleCategoryFilter(
                                                        category.id
                                                    )
                                                }
                                            >
                                                {category.name}(
                                                {category.blogs?.length || 0})
                                            </button>
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            {/* Recent Posts */}
                            <div className={styles.recentPostsSection}>
                                <h3 className={styles.sectionTitle}>
                                    Recent Post
                                </h3>
                                <ul className={styles.recentPostsList}>
                                    {allBlogs.slice(0, 4).map((blog) => (
                                        <li
                                            key={blog.id}
                                            className={styles.recentPostItem}
                                        >
                                            <button
                                                className={
                                                    styles.recentPostButton
                                                }
                                                onClick={() =>
                                                    handleBlogSelect(blog.id)
                                                }
                                            >
                                                <div
                                                    className={
                                                        styles.recentPostImage
                                                    }
                                                >
                                                    <img
                                                        src={
                                                            blog.image ||
                                                            "/storage/offer/templateP.png"
                                                        }
                                                        alt={blog.title}
                                                    />
                                                </div>
                                                <div
                                                    className={
                                                        styles.recentPostContent
                                                    }
                                                >
                                                    <h4
                                                        className={
                                                            styles.recentPostTitle
                                                        }
                                                    >
                                                        {blog.title}
                                                    </h4>
                                                    <span
                                                        className={
                                                            styles.recentPostDate
                                                        }
                                                    >
                                                        {formatDate(
                                                            blog.created_at
                                                        )}
                                                    </span>
                                                </div>
                                            </button>
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            {/* Tag Clouds */}
                            <div className={styles.tagsSection}>
                                <h3 className={styles.sectionTitle}>
                                    Tag Clouds
                                </h3>
                                <div className={styles.tagClouds}>
                                    {tags.map((tag) => (
                                        <span
                                            key={tag.id}
                                            className={styles.tag}
                                            onClick={() =>
                                                handleTagFilter(tag.id)
                                            }
                                        >
                                            {tag.name}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </aside>
                        <section className={styles.blogDisplaySection}>
                            {children}
                        </section>
                    </div>
                </div>
            </section>
        </>
    );
}
