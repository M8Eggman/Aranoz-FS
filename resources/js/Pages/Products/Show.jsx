import React, { useState } from "react";
import { Link } from "@inertiajs/react";
import FrontLayout from "@/Layouts/FrontLayout";
import PublicHeader from "@/Components/Header/PublicHeader";
import CommentsSection from "./Partials/CommentsSection";
import AddToCartButton from "@/Components/Buttons/AddToCartButton/AddToCartButton";
import LikeButton from "@/Components/Buttons/LikeButton/LikeButton";
import styles from "./ShowProducts.module.css";
import { capitalize, formatPrice } from "@/utils/StringHelper";
import FlashMessage from "@/Components/FlashMessage/FlashMessage";

export default function Show({
    product,
    previousProduct,
    nextProduct,
}) {
    const specification = product.specification;

    const [activeTab, setActiveTab] = useState("description");
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [quantity, setQuantity] = useState(1);

    // Prépare les images du produit
    const images = [
        product.images_main?.offer || "/storage/offer/templateP.png",
        product.images_rear?.offer || "/storage/offer/templateP.png",
        product.images_left_side?.offer || "/storage/offer/templateP.png",
        product.images_right_side?.offer || "/storage/offer/templateP.png",
    ].filter(Boolean);

    const renderTabContent = () => {
        switch (activeTab) {
            case "description":
                return (
                    <div className={styles.tabContent}>
                        <p className={styles.description}>
                            {product.description}
                        </p>
                    </div>
                );

            case "specification":
                return (
                    <div className={styles.tabContent}>
                        {specification ? (
                            <table className={styles.specTable}>
                                <tbody>
                                    {specification.width && (
                                        <tr>
                                            <td className={styles.specLabel}>
                                                Width
                                            </td>
                                            <td className={styles.specValue}>
                                                {specification.width} cm
                                            </td>
                                        </tr>
                                    )}
                                    {specification.height && (
                                        <tr>
                                            <td className={styles.specLabel}>
                                                Height
                                            </td>
                                            <td className={styles.specValue}>
                                                {specification.height} cm
                                            </td>
                                        </tr>
                                    )}
                                    {specification.depth && (
                                        <tr>
                                            <td className={styles.specLabel}>
                                                Depth
                                            </td>
                                            <td className={styles.specValue}>
                                                {specification.depth} cm
                                            </td>
                                        </tr>
                                    )}
                                    {specification.weight && (
                                        <tr>
                                            <td className={styles.specLabel}>
                                                Weight
                                            </td>
                                            <td className={styles.specValue}>
                                                {specification.weight} kg
                                            </td>
                                        </tr>
                                    )}

                                    {specification.quality_checking && (
                                        <tr>
                                            <td className={styles.specLabel}>
                                                Quality Checking
                                            </td>
                                            <td className={styles.specValue}>
                                                {specification.quality_checking
                                                    ? "Yes"
                                                    : "No"}
                                            </td>
                                        </tr>
                                    )}
                                    {specification.freshness_duration && (
                                        <tr>
                                            <td className={styles.specLabel}>
                                                Freshness Duration
                                            </td>
                                            <td className={styles.specValue}>
                                                {
                                                    specification.freshness_duration
                                                }
                                            </td>
                                        </tr>
                                    )}
                                    {specification.packaging && (
                                        <tr>
                                            <td className={styles.specLabel}>
                                                Packaging
                                            </td>
                                            <td className={styles.specValue}>
                                                {specification.packaging}
                                            </td>
                                        </tr>
                                    )}
                                    {specification.content && (
                                        <tr>
                                            <td className={styles.specLabel}>
                                                Content
                                            </td>
                                            <td className={styles.specValue}>
                                                {specification.content} ml
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        ) : (
                            <p className={styles.noSpecs}>
                                No specifications available for this product.
                            </p>
                        )}
                    </div>
                );

            case "comments":
                return (
                    <div className={styles.tabContent}>
                        <CommentsSection
                            productId={product.id}
                            comments={product.comments}
                        />
                    </div>
                );

            default:
                return null;
        }
    };

    return (
        <>
            <PublicHeader
                title={product.name}
                subtitle={`Home - ${
                    capitalize(product.category?.name) || "Product"
                }`}
            />
            <section className={styles.wrapper}>
                <div className={styles.container}>
                    {/* Navigation */}
                    <div className={styles.navigation}>
                        <Link
                            href={
                                previousProduct
                                    ? route("products.show", previousProduct.id)
                                    : "#"
                            }
                            className={`${styles.navLink} ${
                                !previousProduct ? styles.disabled : ""
                            }`}
                        >
                            Previous
                        </Link>
                        <span className={styles.navSeparator}>|</span>
                        <Link
                            href={
                                nextProduct
                                    ? route("products.show", nextProduct.id)
                                    : "#"
                            }
                            className={`${styles.navLink} ${
                                !nextProduct ? styles.disabled : ""
                            }`}
                        >
                            Next
                        </Link>
                    </div>

                    <div className={styles.productContent}>
                        {/* Images Section */}
                        <div className={styles.imagesSection}>
                            <div className={styles.mainImage}>
                                <img
                                    src={images[currentImageIndex]}
                                    alt={product.name}
                                    className={styles.productImage}
                                />
                            </div>
                            <div className={styles.thumbnails}>
                                {images.map((image, index) => (
                                    <button
                                        key={index}
                                        className={`${styles.thumbnail} ${
                                            currentImageIndex === index
                                                ? styles.active
                                                : ""
                                        }`}
                                        onClick={() =>
                                            setCurrentImageIndex(index)
                                        }
                                    >
                                        <img
                                            src={image}
                                            alt={`${product.name} ${index + 1}`}
                                        />
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Product Info */}
                        <div className={styles.productInfo}>
                            <h1 className={styles.productName}>
                                {product.name}
                            </h1>

                            <div className={styles.pricing}>
                                {product.promotion ? (
                                    <div className={styles.priceRow}>
                                        <span className={styles.oldPrice}>
                                            {formatPrice(product.price)}
                                        </span>
                                        <span className={styles.discount}>
                                            (-{product.promotion}%)
                                        </span>
                                        <span className={styles.currentPrice}>
                                            {formatPrice(product.final_price)}
                                        </span>
                                    </div>
                                ) : (
                                    <span className={styles.currentPrice}>
                                        {formatPrice(product.final_price)}
                                    </span>
                                )}
                            </div>

                            <div className={styles.productDetails}>
                                <div className={styles.detailItem}>
                                    <span className={styles.detailLabel}>
                                        Category:
                                    </span>
                                    <span className={styles.detailValue}>
                                        {capitalize(product.category?.name)}
                                    </span>
                                </div>
                                <div className={styles.detailItem}>
                                    <span className={styles.detailLabel}>
                                        Availability:
                                    </span>
                                    <span className={styles.detailValue}>
                                        {product.stock > 0
                                            ? "In Stock"
                                            : "Out of Stock"}
                                    </span>
                                </div>
                            </div>

                            <div className={styles.description}>
                                <p>{product.description}</p>
                            </div>

                            {/* Product Actions */}
                            <div className={styles.actionButtons}>
                                <AddToCartButton
                                    productId={product.id}
                                    disabled={product.stock === 0}
                                    className={styles.addToCartBtn}
                                />
                                <LikeButton
                                    productId={product.id}
                                    size="medium"
                                    className={styles.likeBtn}
                                />
                            </div>
                        </div>
                    </div>

                    {/* Tabs Section */}
                    <div className={styles.tabsSection}>
                        <div className={styles.tabsHeader}>
                            <button
                                className={`${styles.tab} ${
                                    activeTab === "description"
                                        ? styles.active
                                        : ""
                                }`}
                                onClick={() => setActiveTab("description")}
                            >
                                Description
                            </button>
                            <button
                                className={`${styles.tab} ${
                                    activeTab === "specification"
                                        ? styles.active
                                        : ""
                                }`}
                                onClick={() => setActiveTab("specification")}
                            >
                                Specification
                            </button>
                            <button
                                className={`${styles.tab} ${
                                    activeTab === "comments"
                                        ? styles.active
                                        : ""
                                }`}
                                onClick={() => setActiveTab("comments")}
                            >
                                Comments
                            </button>
                        </div>

                        <div className={styles.tabsContent}>
                            {renderTabContent()}
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}

Show.layout = (page) => <FrontLayout>{page}</FrontLayout>;
