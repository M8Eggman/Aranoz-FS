import BackLayout from "@/Layouts/BackLayout";
import React from "react";
import AdminTable from "../partials/AdminTable/AdminTable";
import AdminHeader from "../partials/Header/AdminHeader";

export default function Coupons({
    coupons: initialCoupons,
    lastId: initialLastId,
}) {
    return (
        <>
            <AdminHeader title="Coupons Settings" />
            <AdminTable
                title="Coupons"
                intialItems={initialCoupons}
                initialLastId={initialLastId}
                storeRoute={route("admin.coupons.store")}
                updateRoute={(id) => route("admin.coupons.update", id)}
                deleteRoute={(id) => route("admin.coupons.destroy", id)}
                secondInput="percentage"
            />
        </>
    );
}

Coupons.layout = (page) => <BackLayout>{page}</BackLayout>;
