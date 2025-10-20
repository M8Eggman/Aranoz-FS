import BackLayout from "@/Layouts/BackLayout";
import React from "react";
import AdminTable from "../partials/AdminTable/AdminTable";
import AdminHeader from "../../../Components/Header/AdminHeader";

export default function Countries({
    countries: initialCountries,
    lastId: initialLastId,
}) {
    return (
        <>
            <AdminHeader title="Countries Settings" />
            <AdminTable
                title="Countries"
                intialItems={initialCountries}
                initialLastId={initialLastId}
                storeRoute={route("admin.countries.store")}
                updateRoute={(id) => route("admin.countries.update", id)}
                deleteRoute={(id) => route("admin.countries.destroy", id)}
            />
        </>
    );
}

Countries.layout = (page) => <BackLayout>{page}</BackLayout>;
