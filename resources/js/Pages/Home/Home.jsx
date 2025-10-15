import FrontLayout from "@/Layouts/FrontLayout";
import React from "react";
import Carousel from "./Partials/Carousel";
import FeaturedCategories from "./Partials/FeaturedCategories";
import ProductsCarousel from "./Partials/ProductsCarousel";

export default function Home({
    randomProducts = [],
    pinnedProducts = [],
    categories = [],
    products = [],
}) {
    const source = [...pinnedProducts, ...randomProducts];
    const slides = source.map((p, i) => ({
        title: p.name,
        description: p.description,
        number: String(i + 1).padStart(2, "0"),
        image: p?.images_main?.offer || "/storage/offer/templateP.png",
    }));

    return (
        <>
            <Carousel slides={slides} />
            <FeaturedCategories categories={categories} />
            <ProductsCarousel products={products} />
        </>
    );
}

Home.layout = (page) => <FrontLayout>{page}</FrontLayout>;
