import BackLayout from "@/Layouts/BackLayout";
import React from "react";
import AdminTable from "../partials/AdminTable/AdminTable";
import AdminHeader from "../partials/Header/AdminHeader";

export default function BlogCategories({
    categories: initialCategories,
    lastId: initialLastId,
}) {
    return (
        <>
            <AdminHeader title="Blog Categories Settings" />
            <AdminTable
                title="Blog Categories"
                intialItems={initialCategories}
                initialLastId={initialLastId}
                storeRoute={route("admin.blogs-categories.store")}
                updateRoute={(id) => route("admin.blogs-categories.update", id)}
                deleteRoute={(id) =>
                    route("admin.blogs-categories.destroy", id)
                }
            />
        </>
    );
}

BlogCategories.layout = (page) => <BackLayout>{page}</BackLayout>;
