import FrontLayout from "@/Layouts/FrontLayout";
import React from "react";
import Carousel from "./Partials/Carousel";
import FeaturedCategories from "./Partials/FeaturedCategories";
import ProductsCarousel from "./Partials/ProductsCarousel";
import WeeklySale from "./Partials/WeeklySale";
import BestSellersCarousel from "./Partials/BestSellerCarousel";
import Newsletter from "./Partials/Newsletter";

export default function Home({
    randomProducts = [],
    pinnedProducts = [],
    categories = [],
    products = [],
    weeklySaleEndsAt,
    bestSellers = [],
}) {
    const slides = [...pinnedProducts, ...randomProducts].map((p, i) => ({
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
            <WeeklySale until={weeklySaleEndsAt} />
            <BestSellersCarousel bestSellers={bestSellers} />
            <Newsletter />
        </>
    );
}

Home.layout = (page) => <FrontLayout>{page}</FrontLayout>;
