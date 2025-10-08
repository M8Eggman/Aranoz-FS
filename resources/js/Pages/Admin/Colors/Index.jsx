import BackLayout from "@/Layouts/BackLayout";
import React from "react";
import AdminTable from "../partials/AdminTable/AdminTable";
import AdminHeader from "../partials/Header/AdminHeader";

export default function Colors({
    colors: initialColors,
    lastId: initialLastId,
}) {
    return (
        <>
            <AdminHeader title="Colors Settings" />
            <AdminTable
                title="Colors"
                intialItems={initialColors}
                initialLastId={initialLastId}
                storeRoute={route("admin.colors.store")}
                updateRoute={(id) => route("admin.colors.update", id)}
                deleteRoute={(id) => route("admin.colors.destroy", id)}
                secondInput="hex"
            />
        </>
    );
}

Colors.layout = (page) => <BackLayout>{page}</BackLayout>;
