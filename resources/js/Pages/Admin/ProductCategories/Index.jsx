import BackLayout from "@/Layouts/BackLayout";
import React from "react";
import AdminTable from "../partials/AdminTable/AdminTable";
import AdminHeader from "../partials/Header/AdminHeader";

export default function ProductCategories({
    categories: initialCategories,
    lastId: initialLastId,
}) {
    return (
        <>
            <AdminHeader title="Product Categories Settings" />
            <AdminTable
                title="Product Categories"
                intialItems={initialCategories}
                initialLastId={initialLastId}
                storeRoute={route("admin.products-categories.store")}
                updateRoute={(id) =>
                    route("admin.products-categories.update", id)
                }
                deleteRoute={(id) =>
                    route("admin.products-categories.destroy", id)
                }
            />
        </>
    );
}

ProductCategories.layout = (page) => <BackLayout>{page}</BackLayout>;
