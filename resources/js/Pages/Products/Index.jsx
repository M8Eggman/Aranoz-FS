import React, { useState } from "react";
import { Link, router } from "@inertiajs/react";
import FrontLayout from "@/Layouts/FrontLayout";
import PublicHeader from "@/Components/Header/PublicHeader";
import ProductCards from "@/Components/Cards/ProductCards";
import { FaSearch } from "react-icons/fa";
import styles from "./Products.module.css";
import TextInput from "@/Components/Form/TextInput/TextInput";
import FlashMessage from "@/Components/FlashMessage/FlashMessage";
import BestSellersCarousel from "../Home/Partials/BestSellerCarousel";

export default function Index({
    products,
    categories,
    colors,
    category_id,
    color_id,
    search,
}) {
    const [searchTerm, setSearchTerm] = useState(search || "");
    const [selectedCategory, setSelectedCategory] = useState(
        category_id || null
    );
    const [selectedColor, setSelectedColor] = useState(color_id || null);

    function handleSearch(e) {
        e.preventDefault();
        router.post(
            route("products"),
            {
                search: searchTerm,
                category_id: selectedCategory,
                color_id: selectedColor,
            },
            { preserveScroll: true, preserveState: true }
        );
    }

    function handleCategoryFilter(categoryId) {
        const newCategory = selectedCategory === categoryId ? null : categoryId;
        setSelectedCategory(newCategory);
        router.post(
            route("products"),
            {
                search: searchTerm,
                category_id: newCategory,
                color_id: selectedColor,
            },
            { preserveScroll: true, preserveState: true }
        );
    }

    function handleColorFilter(colorId) {
        const newColor = selectedColor === colorId ? null : colorId;
        setSelectedColor(newColor);
        router.post(
            route("products"),
            {
                search: searchTerm,
                category_id: selectedCategory,
                color_id: newColor,
            },
            { preserveScroll: true, preserveState: true }
        );
    }

    return (
        <>
            <PublicHeader
                title="Shop Category"
                subtitle="Home - Shop Category"
            />
            <section className={styles.wrapper}>
                <div className={styles.container}>
                    <div className={styles.content}>
                        {/* Sidebar Filters */}
                        <aside className={styles.sidebar}>
                            <div className={styles.filtersSection}>
                                <h3 className={styles.filtersTitle}>
                                    Product filters
                                </h3>
                                <ul className={styles.filtersList}>
                                    {categories.map((category) => (
                                        <li key={category.id}>
                                            <button
                                                className={`${
                                                    styles.filterItem
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
                                                {category.name}
                                            </button>
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            <div className={styles.filtersSection}>
                                <h3 className={styles.filtersTitle}>
                                    Color Filter
                                </h3>
                                <ul className={styles.filtersList}>
                                    {colors.map((color) => (
                                        <li key={color.id}>
                                            <button
                                                className={`${
                                                    styles.filterItem
                                                } ${
                                                    selectedColor === color.id
                                                        ? styles.active
                                                        : ""
                                                }`}
                                                onClick={() =>
                                                    handleColorFilter(color.id)
                                                }
                                            >
                                                {color.name}
                                            </button>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </aside>

                        {/* Main Content */}
                        <main className={styles.main}>
                            {/* Search Bar */}
                            <div className={styles.searchSection}>
                                <form
                                    onSubmit={handleSearch}
                                    className={styles.searchForm}
                                >
                                    <TextInput
                                        type="text"
                                        placeholder="Recherche"
                                        value={searchTerm}
                                        onChange={(e) =>
                                            setSearchTerm(e.target.value)
                                        }
                                        className={styles.searchInput}
                                    />
                                    <button
                                        type="submit"
                                        className={styles.searchButton}
                                    >
                                        <FaSearch />
                                    </button>
                                </form>
                            </div>

                            <FlashMessage />

                            {/* Products Grid */}
                            <div className={styles.productsGrid}>
                             
                                {products.map((product) => (
                                    <ProductCards
                                        key={product.id}
                                        id={product.id}
                                        image={product?.images_main?.product}
                                        name={product.name}
                                        price={product.price}
                                        promotion={product.promotion || null}
                                        final_price={product.final_price}
                                    />
                                ))}
                            </div>

                            {products.length === 0 && (
                                <div className={styles.noProducts}>
                                    <p>Aucun produit trouvé.</p>
                                </div>
                            )}
                        </main>
                    </div>
                </div>
            </section>
        </>
    );
}

Index.layout = (page) => <FrontLayout>{page}</FrontLayout>;
