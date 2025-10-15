import FrontLayout from "@/Layouts/FrontLayout";
import React from "react";
import Carousel from "./Partials/Carousel";

export default function Home({ randomProducts = [], pinnedProducts = [] }) {
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
        </>
    );
}

Home.layout = (page) => <FrontLayout>{page}</FrontLayout>;
