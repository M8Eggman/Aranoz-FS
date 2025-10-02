import BackLayout from "@/Layouts/BackLayout";
import React from "react";
import AdminTable from "../partials/AdminTable/AdminTable";
import AdminHeader from "../partials/Header/AdminHeader";

export default function Tags({ tags: initialTags, lastId: initialLastId }) {
    return (
        <>
            <AdminHeader title="Tags Settings" />
            <AdminTable
                title="Tags"
                intialItems={initialTags}
                initialLastId={initialLastId}
                storeRoute={route("admin.tags.store")}
                updateRoute={(id) => route("admin.tags.update", id)}
                deleteRoute={(id) => route("admin.tags.destroy", id)}
            />
        </>
    );
}

Tags.layout = (page) => <BackLayout>{page}</BackLayout>;
